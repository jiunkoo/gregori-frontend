import { Link } from "react-router-dom";

import { Icon, Layout } from "@components";
import { MYPAGE_CONSTANTS } from "@constants";
import "@styles/mypage.css";

const MyPage = () => {
  return (
    <Layout showMyPageSidebar={true}>
      <main className="mypage">
        <div className="mypage__grade-section">
          <div className="mypage__grade-item mypage__grade-item--standard">
            <div className="mypage__grade-header">
              <div className="mypage__grade-label">
                {MYPAGE_CONSTANTS.GRADE.LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="mypage__grade-header-arrow"
                color="white"
              />
            </div>
            <div className="mypage__grade-footer">
              <div className="mypage__grade-value">
                {MYPAGE_CONSTANTS.GRADE.VALUE}
              </div>
              <button type="button" className="mypage__grade-benefit-button">
                {MYPAGE_CONSTANTS.GRADE.BENEFIT_BUTTON}
              </button>
            </div>
          </div>
          <div className="mypage__grade-item mypage__grade-item--standard">
            <div className="mypage__grade-header">
              <div className="mypage__grade-label">
                {MYPAGE_CONSTANTS.GRADE.COUPON_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="mypage__grade-header-arrow"
                color="white"
              />
            </div>
            <div className="mypage__grade-footer">
              <div className="mypage__grade-value">4</div>
            </div>
          </div>
          <div className="mypage__grade-item mypage__grade-item--standard">
            <div className="mypage__grade-header">
              <div className="mypage__grade-label">
                {MYPAGE_CONSTANTS.GRADE.MILEAGE_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="mypage__grade-header-arrow"
                color="white"
              />
            </div>
            <div className="mypage__grade-footer">
              <div className="mypage__grade-value">0</div>
            </div>
          </div>
        </div>

        <div className="mypage__section">
          <div className="mypage__section-header">
            <div className="mypage__section-title">
              {MYPAGE_CONSTANTS.SECTION.RECENT_ORDER}
            </div>
            <Link to="/orderlist" className="mypage__section-more">
              <span className="mypage__section-more-text">
                {MYPAGE_CONSTANTS.SECTION.MORE}
              </span>
              <Icon
                name="arrowRight"
                size={16}
                className="mypage__section-more-arrow"
                color="black"
              />
            </Link>
          </div>

          <div className="mypage__order-item">
            <div className="mypage__order-date">
              {MYPAGE_CONSTANTS.ORDER.DATE}
            </div>
            <div className="mypage__order-image">
              <Icon name="image" size={40} />
            </div>
            <div className="mypage__order-info">
              <div className="mypage__order-product">
                {MYPAGE_CONSTANTS.ORDER.PRODUCT}
              </div>
            </div>
            <div className="mypage__order-price">
              {MYPAGE_CONSTANTS.ORDER.PRICE}
            </div>
          </div>
        </div>

        <div className="mypage__section">
          <div className="mypage__section-header">
            <div className="mypage__section-title">
              {MYPAGE_CONSTANTS.SECTION.WISHLIST}
            </div>
            <div className="mypage__section-more">
              <span className="mypage__section-more-text">
                {MYPAGE_CONSTANTS.SECTION.MORE}
              </span>
              <Icon
                name="arrowRight"
                size={16}
                className="mypage__section-more-arrow"
                color="black"
              />
            </div>
          </div>

          <div className="mypage__wishlist-tab-item">
            {MYPAGE_CONSTANTS.WISHLIST.PRODUCT_TAB}
          </div>

          <div className="mypage__wishlist-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="mypage__wishlist-item">
                <div className="mypage__wishlist-image">
                  <Icon name="image" size={60} />
                </div>
              </div>
            ))}
          </div>

          <div className="mypage__wishlist-tab-item">
            {MYPAGE_CONSTANTS.SECTION.BRAND}
          </div>

          <div className="mypage__wishlist-item">
            <div className="mypage__wishlist-item-empty-text">
              {MYPAGE_CONSTANTS.WISHLIST.EMPTY_BRAND}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default MyPage;
