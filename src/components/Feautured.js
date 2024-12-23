const Featured = () => {
    return (
        <>
            <div className="featured-contain">
                <h1>Featured</h1>
                <div className="feat-banner">
                    <div className="banner-content">
                        <div className="banner-title">
                            <h2>
                                XOCIETY Frontier <img src="./Subtract.svg" alt="Ekos Genesis" />
                            </h2>
                            <p>
                                By XOSOCIETYofficial <img src="./Subtract1.svg" width={15} alt="Ekos Genesis" />
                            </p>
                        </div>
                        <div className="banner-foot">
                            <p>Open edition 0.00269 ETH</p>
                            <div className="banner-button">
                                <img src="./Ellipse 5.svg" alt="Ekos Genesis" />
                                Minting
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Featured;
