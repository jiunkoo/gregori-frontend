import React from "react";
import { Link } from "react-router-dom";
import Icon from "@components/icons/SvgIcon";
import "@styles/mypage.css";
import Layout from "@components/Layout";
import { MYPAGE_CONSTANTS } from "@constants";

const MyPage: React.FC = () => {
  return (
    <Layout showMyPageSidebar={true}>
      <div className="mypage-wrapper">
        <div className="mypage-container">
          {/* 기본 정보 영역 */}
          <div className="mypage-content">
            {/* 등급 영역 */}
            <div className="mypage-grade-section">
              <div className="mypage-grade-item">
                <div className="mypage-grade-content">
                  <div className="mypage-grade-label">
                    {MYPAGE_CONSTANTS.GRADE.LABEL}
                  </div>
                  <Icon
                    name="arrowRight"
                    size={10}
                    className="mypage-grade-arrow"
                    color="white"
                  />
                  <div className="mypage-grade-content">
                    <div className="mypage-grade-value">
                      {MYPAGE_CONSTANTS.GRADE.VALUE}
                    </div>
                  </div>
                </div>
                <div className="mypage-grade-benefit">
                  <div className="mypage-grade-benefit-button">
                    {MYPAGE_CONSTANTS.GRADE.BENEFIT_BUTTON}
                  </div>
                </div>
              </div>
              <div className="mypage-grade-divider"></div>
              <div className="mypage-grade-item">
                <div className="mypage-grade-content">
                  <div className="mypage-grade-label">
                    {MYPAGE_CONSTANTS.GRADE.COUPON_LABEL}
                  </div>
                  <div className="mypage-grade-value">4</div>
                </div>
                <Icon
                  name="arrowRight"
                  size={10}
                  className="mypage-grade-arrow"
                  color="white"
                />
              </div>
              <div className="mypage-grade-divider"></div>
              <div className="mypage-grade-item">
                <div className="mypage-grade-content">
                  <div className="mypage-grade-label">
                    {MYPAGE_CONSTANTS.GRADE.MILEAGE_LABEL}
                  </div>
                  <div className="mypage-grade-value">0</div>
                </div>
                <Icon
                  name="arrowRight"
                  size={10}
                  className="mypage-grade-arrow"
                  color="white"
                />
              </div>
            </div>

            {/* 최근 주문 */}
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
                    size={10}
                    className="mypage-section-more-arrow"
                    color="black"
                  />
                </Link>
              </div>
              <div className="mypage-section-divider"></div>

              <div className="mypage-order-item">
                <div className="mypage-order-date">
                  {MYPAGE_CONSTANTS.ORDER.DATE}
                </div>
                <div className="mypage-order-info">
                  <div className="mypage-order-product">
                    {MYPAGE_CONSTANTS.ORDER.PRODUCT}
                  </div>
                  <div className="mypage-order-price">
                    {MYPAGE_CONSTANTS.ORDER.PRICE}
                  </div>
                </div>
                <div className="mypage-order-image">
                  <Icon name="image" size={80} />
                </div>
              </div>
            </div>

            {/* 찜 목록 */}
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
                    size={10}
                    className="mypage-section-more-arrow"
                    color="black"
                  />
                </div>
              </div>
              <div className="mypage-section-divider"></div>

              <div className="mypage-wishlist-tab">
                <div className="mypage-wishlist-tab-item">
                  {MYPAGE_CONSTANTS.WISHLIST.PRODUCT_TAB}
                </div>
              </div>

              <div className="mypage-wishlist-grid">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="mypage-wishlist-item">
                    <div className="mypage-wishlist-image">
                      <Icon name="image" size={150} />
                    </div>
                    <div className="mypage-wishlist-info">
                      <div className="mypage-wishlist-brand">
                        {MYPAGE_CONSTANTS.PRODUCT.BRAND}
                      </div>
                      <div className="mypage-wishlist-name">
                        {MYPAGE_CONSTANTS.PRODUCT.NAME}
                      </div>
                      <div className="mypage-wishlist-price">
                        {MYPAGE_CONSTANTS.PRODUCT.PRICE}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 브랜드 */}
            <div className="mypage-section">
              <div className="mypage-section-header">
                <div className="mypage-section-title">
                  {MYPAGE_CONSTANTS.SECTION.BRAND}
                </div>
              </div>
              <div className="mypage-section-divider"></div>

              <div className="mypage-brand-empty">
                <div className="mypage-brand-empty-text">
                  {MYPAGE_CONSTANTS.WISHLIST.EMPTY_BRAND}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
