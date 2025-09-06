import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const AuthorItems = ({ authorData }) => {
  const [nftData, setNftData] = useState([]);
  const loading = !nftData || nftData.length === 0;

  useEffect(() => {
    if (authorData?.nftCollection) {
      setNftData(authorData.nftCollection);
    }
  }, [authorData]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton circle={true} height={50} />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton height={150} width={"100%"} />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width={"50%"} />
                      <Skeleton width={"25%"} />
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <Skeleton width={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : nftData.map((nft, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img src={authorData?.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt={nft.title}
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${nft.nftId}`}>
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nft.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
