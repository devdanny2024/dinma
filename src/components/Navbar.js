import { useState, useEffect } from 'react';
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { supabase } from './supabase'; // Import the Supabase client
import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loader visibility

  const { isConnected } = useAccount(); // Get wallet address
  const address = 'AwbJHBTKz82h9e2Epm45qGhX4r13FoXfzKCU7TJj3gbx'; // Replace with actual address for testing
  
  // Function to fetch Ethereum NFTs
  const fetchEthereumNFTs = async (address) => {
    const apiKey = 'V4QidqQN3CnapxngEQGMGFl0ZEkS72Bg';
    const baseUrl = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
    const fetchUrl = `${baseUrl}/getNFTs/?owner=${address}`;

    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();

      const nftRows = data.ownedNfts.map((nft) => ({
        name: nft.metadata.name || 'Unknown',
        token_type: nft.id.tokenMetadata.tokenType,
        token_id: nft.id.tokenId,
        address: nft.contract.address,
        image: nft.metadata.image || null,
        owner: nft.owner || null,
        owner_address: address,
        price: nft.price || null,
        blockchain: 'ethereum',
      }));

      return nftRows;
    } catch (error) {
      console.error('Error fetching Ethereum NFTs:', error);
      return [];
    }
  };

  // Function to fetch Solana NFTs
  const fetchSolanaNFTs = async (address) => {
    try {
      const apiKey = 'V4QidqQN3CnapxngEQGMGFl0ZEkS72Bg'; // Replace with your actual Alchemy API key
      const baseUrl = 'https://solana-mainnet.g.alchemy.com/v2/V4QidqQN3CnapxngEQGMGFl0ZEkS72Bg'; // Solana API endpoint
      const url = `${baseUrl}/getNFTs?owner=${address}`; // Fetch NFTs for the Solana address
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (!data.nfts || !data.nfts.length) {
        console.warn('No NFTs found for this address.');
        return [];
      }
  
      const nftRows = data.nfts.map((nft) => ({
        token_id: nft.tokenAddress,
        name: nft.metadata?.name || 'Unknown',
        token_type: 'spl-token',
        address: nft.tokenAddress,
        image: nft.metadata?.image || null,
        owner: address,
        owner_address: address,
        price: null, // Add price logic if needed
        blockchain: 'solana',
      }));
  
      return nftRows;
    } catch (error) {
      console.error('Error fetching Solana NFTs:', error);
      return [];
    }
  };

  // Fetch NFTs based on the address
  const fetchNFTs = async () => {
    if (!address) return;

    setIsLoading(true); // Show loader while fetching data

    try {
      let nftRows = [];
      if (address.startsWith('0x')) {
        // Ethereum address
        nftRows = await fetchEthereumNFTs(address);
      } else if (address.length === 44) {
        // Solana address (check length and format)
        nftRows = await fetchSolanaNFTs(address);
      } else {
        console.error('Unsupported blockchain address format.');
        return;
      }

      const { error } = await supabase.from('nfts').insert(nftRows);

      if (error) {
        console.error('Error inserting data into Supabase:', error);
      } else {
        console.log('NFT data inserted successfully');
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setIsLoading(false); // Hide loader when done
    }
  };

  // Watch for wallet connection status and fetch NFTs
  useEffect(() => {
    if (isConnected) {
      console.log('Connected Address:', address);
      fetchNFTs();
    } else {
      console.warn('Wallet not connected.');
    }
  }, [isConnected]);

  // Toggle menu visibility
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <nav className={isScrolled ? 'navbar active' : 'navbar'}>
        <div className="nav-container">
          <button
            className={`hamburger ${isMenuOpen ? 'open' : ''}`}
            onClick={handleMenuToggle}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <ul className={`navLinks ${isMenuOpen ? 'showMenu' : ''}`}>
            <li>
              <a href="/" onClick={() => scrollToSection('home')}>Home</a>
            </li>
            <li>
              <a href="#about" onClick={() => scrollToSection('about')}>About Us</a>
            </li>
            <li>
              <a href="#services" onClick={() => scrollToSection('services')}>Why Us</a>
            </li>
            <li>
              <a href="#contact" onClick={() => scrollToSection('contact')}>Contact Us</a>
            </li>
          </ul>
          <ConnectButton
            theme={darkTheme({
              accentColor: '#7b3fe4',
              accentColorForeground: 'white',
              borderRadius: 'medium',
            })}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
