import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState({});
  const [follow, setFollow] = useState(false);
  const loading = !authorData.authorImage; // loading if data not yet fetched

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  async function fetchAuthor() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthorData(data);
    } catch (error) {
      console.error("Error fetching api:", error);
      setAuthorData({});
    }
  }

  useEffect(() => {
    fetchAuthor();
  }, [authorId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton circle={true} height={150} width={150} />
                      ) : (
                        <img src={authorData?.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? <Skeleton /> : authorData?.authorName}
                          <span className="profile_username">
                            {loading ? <Skeleton /> : `@${authorData?.tag}`}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? <Skeleton width={200} /> : authorData?.address}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading
                          ? <Skeleton width={100} />
                          : follow
                          ? authorData?.followers + 1
                          : authorData?.followers}{" "}
                        followers
                      </div>
                      <button
                        className="btn-main"
                        onClick={() => setFollow(!follow)}
                      >
                        {follow ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authorData} fetchAuthor={fetchAuthor} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
