import React from "react";
import { Link } from "react-router-dom";
import Icon from "@components/icons/SvgIcon";
import "@styles/mypage.css";
import Layout from "@components/Layout";
import { MYPAGE_CONSTANTS } from "@constants";

const MyPage: React.FC = () => {
  return (
    <Layout showMyPageSidebar={true}>
      <div className="mypage-container">
        <div className="mypage-grade-section">
          <div className="mypage-grade-item mypage-grade-item-standard">
            <div className="mypage-grade-header">
              <div className="mypage-grade-label">
                {MYPAGE_CONSTANTS.GRADE.LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="mypage-grade-header-arrow"
                color="white"
              />
            </div>
            <div className="mypage-grade-footer">
              <div className="mypage-grade-value">
                {MYPAGE_CONSTANTS.GRADE.VALUE}
              </div>
              <div className="mypage-grade-benefit-button">
                {MYPAGE_CONSTANTS.GRADE.BENEFIT_BUTTON}
              </div>
            </div>
          </div>
          <div className="mypage-grade-item mypage-grade-item-standard">
            <div className="mypage-grade-header">
              <div className="mypage-grade-label">
                {MYPAGE_CONSTANTS.GRADE.COUPON_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="mypage-grade-header-arrow"
                color="white"
              />
            </div>
            <div className="mypage-grade-footer">
              <div className="mypage-grade-value">4</div>
            </div>
          </div>
          <div className="mypage-grade-item mypage-grade-item-standard">
            <div className="mypage-grade-header">
              <div className="mypage-grade-label">
                {MYPAGE_CONSTANTS.GRADE.MILEAGE_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="mypage-grade-header-arrow"
                color="white"
              />
            </div>
            <div className="mypage-grade-footer">
              <div className="mypage-grade-value">0</div>
            </div>
          </div>
        </div>

        <div className="mypage-section">
          <div className="mypage-section-header">
            <div className="mypage-section-title">
              {MYPAGE_CONSTANTS.SECTION.RECENT_ORDER}
            </div>
            <Link to="/orderlist" className="mypage-section-more">
              <div className="mypage-section-more-text">
                {MYPAGE_CONSTANTS.SECTION.MORE}
              </div>
              <Icon
                name="arrowRight"
                size={16}
                className="mypage-section-more-arrow"
                color="black"
              />
            </Link>
          </div>

          <div className="mypage-order-item">
            <div className="mypage-order-date">
              {MYPAGE_CONSTANTS.ORDER.DATE}
            </div>
            <div className="mypage-order-image">
              <Icon name="image" size={40} />
            </div>
            <div className="mypage-order-info">
              <div className="mypage-order-product">
                {MYPAGE_CONSTANTS.ORDER.PRODUCT}
              </div>
            </div>
            <div className="mypage-order-price">
              {MYPAGE_CONSTANTS.ORDER.PRICE}
            </div>
          </div>
        </div>

        <div className="mypage-section">
          <div className="mypage-section-header">
            <div className="mypage-section-title">
              {MYPAGE_CONSTANTS.SECTION.WISHLIST}
            </div>
            <div className="mypage-section-more">
              <div className="mypage-section-more-text">
                {MYPAGE_CONSTANTS.SECTION.MORE}
              </div>
              <Icon
                name="arrowRight"
                size={16}
                className="mypage-section-more-arrow"
                color="black"
              />
            </div>
          </div>

          <div className="mypage-wishlist-tab-item">
            {MYPAGE_CONSTANTS.WISHLIST.PRODUCT_TAB}
          </div>

          <div className="mypage-wishlist-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="mypage-wishlist-item">
                <div className="mypage-wishlist-image">
                  <Icon name="image" size={60} />
                </div>
              </div>
            ))}
          </div>

          <div className="mypage-wishlist-tab-item">
            {MYPAGE_CONSTANTS.SECTION.BRAND}
          </div>

          <div className="mypage-wishlist-item">
            <div className="mypage-wishlist-item-empty-text">
              {MYPAGE_CONSTANTS.WISHLIST.EMPTY_BRAND}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
