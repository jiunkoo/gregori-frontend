import Icon from "@components/icons/SvgIcon";
import Layout from "@components/Layout";
import { ORDERDETAIL_CONSTANTS } from "@constants";
import "@styles/orderdetail.css";

const OrderDetail = () => {
  return (
    <Layout showMyPageSidebar={true}>
      <main className="orderdetail">
        <div className="orderdetail__grade-section">
          <div className="orderdetail__grade-item">
            <div className="orderdetail__grade-header">
              <div className="orderdetail__grade-label">
                {ORDERDETAIL_CONSTANTS.GRADE.LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderdetail__grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderdetail__grade-footer">
              <div className="orderdetail__grade-value">
                {ORDERDETAIL_CONSTANTS.GRADE.VALUE}
              </div>
              <button
                type="button"
                className="orderdetail__grade-benefit-button"
              >
                {ORDERDETAIL_CONSTANTS.GRADE.BENEFIT_BUTTON}
              </button>
            </div>
          </div>
          <div className="orderdetail__grade-item">
            <div className="orderdetail__grade-header">
              <div className="orderdetail__grade-label">
                {ORDERDETAIL_CONSTANTS.GRADE.COUPON_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderdetail__grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderdetail__grade-footer">
              <div className="orderdetail__grade-value">4</div>
            </div>
          </div>
          <div className="orderdetail__grade-item">
            <div className="orderdetail__grade-header">
              <div className="orderdetail__grade-label">
                {ORDERDETAIL_CONSTANTS.GRADE.MILEAGE_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderdetail__grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderdetail__grade-footer">
              <div className="orderdetail__grade-value">0</div>
            </div>
          </div>
        </div>

        <div className="orderdetail__section">
          <div className="orderdetail__section-header">
            <h2 className="orderdetail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.ORDER_DETAIL}
            </h2>
          </div>

          <div className="orderdetail__progress">
            <div className="orderdetail__progress-item">
              <div className="orderdetail__progress-circle">0</div>
              <div className="orderdetail__progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.PAYMENT_PENDING}
              </div>
            </div>
            <Icon
              name="arrowRight"
              size={24}
              className="orderdetail__progress-arrow"
              color="black"
            />
            <div className="orderdetail__progress-item orderdetail__progress-item--active">
              <div className="orderdetail__progress-circle">1</div>
              <div className="orderdetail__progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.PAYMENT_COMPLETED}
              </div>
            </div>
            <Icon
              name="arrowRight"
              size={24}
              className="orderdetail__progress-arrow"
              color="black"
            />
            <div className="orderdetail__progress-item">
              <div className="orderdetail__progress-circle">0</div>
              <div className="orderdetail__progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.PRODUCT_PREPARING}
              </div>
            </div>
            <Icon
              name="arrowRight"
              size={24}
              className="orderdetail__progress-arrow"
              color="black"
            />
            <div className="orderdetail__progress-item">
              <div className="orderdetail__progress-circle">0</div>
              <div className="orderdetail__progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.SHIPPING_START}
              </div>
            </div>
            <Icon
              name="arrowRight"
              size={24}
              className="orderdetail__progress-arrow"
              color="black"
            />
            <div className="orderdetail__progress-item">
              <div className="orderdetail__progress-circle">0</div>
              <div className="orderdetail__progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.SHIPPING}
              </div>
            </div>
            <Icon
              name="arrowRight"
              size={24}
              className="orderdetail__progress-arrow"
              color="black"
            />
            <div className="orderdetail__progress-item">
              <div className="orderdetail__progress-circle">0</div>
              <div className="orderdetail__progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.DELIVERED}
              </div>
            </div>
          </div>
        </div>

        <div className="orderdetail__section">
          <div className="orderdetail__section-header">
            <h2 className="orderdetail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.ORDER_PRODUCT}
            </h2>
          </div>

          <div className="orderdetail__order-header">
            <div className="orderdetail__order-date">
              {ORDERDETAIL_CONSTANTS.ORDER.DATE_LABEL}{" "}
              <span className="orderdetail__order-date-value">
                {ORDERDETAIL_CONSTANTS.ORDER.DATE_VALUE}
              </span>{" "}
              {ORDERDETAIL_CONSTANTS.ORDER.NUMBER_LABEL}{" "}
              <span className="orderdetail__order-number">
                {ORDERDETAIL_CONSTANTS.ORDER.NUMBER_VALUE}
              </span>
            </div>
          </div>

          <div className="orderdetail__order-detail">
            <div className="orderdetail__order-product">
              <div className="orderdetail__order-image">
                <Icon name="image" size={60} />
              </div>
              <div className="orderdetail__order-info">
                <div className="orderdetail__order-brand">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.BRAND_1}
                </div>
                <div className="orderdetail__order-name">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.NAME}
                </div>
                <div className="orderdetail__order-option">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.OPTION}
                </div>
                <div className="orderdetail__order-price">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.PRICE_1}
                </div>
              </div>

              <div className="orderdetail__order-quantity">
                {ORDERDETAIL_CONSTANTS.PRODUCT.QUANTITY_1}
              </div>
              <div className="orderdetail__order-shipping">
                {ORDERDETAIL_CONSTANTS.SHIPPING.LABEL} <br />
                {ORDERDETAIL_CONSTANTS.SHIPPING.FEE}
              </div>
              <div className="orderdetail__order-status">
                {ORDERDETAIL_CONSTANTS.STATUS.PAYMENT_COMPLETED}
              </div>
              <div className="orderdetail__order-delivery">
                {ORDERDETAIL_CONSTANTS.SHIPPING.EXPECTED_DATE}
                <br />
                {ORDERDETAIL_CONSTANTS.SHIPPING.STATUS}
              </div>
            </div>

            <div className="orderdetail__order-actions">
              <button
                type="button"
                className="orderdetail__order-action-button"
              >
                {ORDERDETAIL_CONSTANTS.BUTTONS.CANCEL}
              </button>
              <button
                type="button"
                className="orderdetail__order-action-button"
              >
                {ORDERDETAIL_CONSTANTS.BUTTONS.INQUIRY}
              </button>
            </div>
          </div>

          <div className="orderdetail__order-detail">
            <div className="orderdetail__order-product">
              <div className="orderdetail__order-image">
                <Icon name="image" size={60} />
              </div>
              <div className="orderdetail__order-info">
                <div className="orderdetail__order-brand">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.BRAND_2}
                </div>
                <div className="orderdetail__order-name">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.NAME}
                </div>
                <div className="orderdetail__order-option">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.OPTION}
                </div>
                <div className="orderdetail__order-price">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.PRICE_2}
                </div>
              </div>

              <div className="orderdetail__order-quantity">
                {ORDERDETAIL_CONSTANTS.PRODUCT.QUANTITY_2}
              </div>
              <div className="orderdetail__order-shipping">
                {ORDERDETAIL_CONSTANTS.SHIPPING.LABEL} <br />
                {ORDERDETAIL_CONSTANTS.SHIPPING.FEE}
              </div>
              <div className="orderdetail__order-status">
                {ORDERDETAIL_CONSTANTS.STATUS.PAYMENT_COMPLETED}
              </div>
              <div className="orderdetail__order-delivery">
                {ORDERDETAIL_CONSTANTS.SHIPPING.EXPECTED_DATE}
                <br />
                {ORDERDETAIL_CONSTANTS.SHIPPING.STATUS}
              </div>
            </div>

            <div className="orderdetail__order-actions">
              <button
                type="button"
                className="orderdetail__order-action-button"
              >
                {ORDERDETAIL_CONSTANTS.BUTTONS.CANCEL}
              </button>
              <button
                type="button"
                className="orderdetail__order-action-button"
              >
                {ORDERDETAIL_CONSTANTS.BUTTONS.INQUIRY}
              </button>
            </div>
          </div>
        </div>

        <div className="orderdetail__section">
          <div className="orderdetail__section-header">
            <h2 className="orderdetail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.CUSTOMER}
            </h2>
          </div>

          <div className="orderdetail__customer-info">
            <div className="orderdetail__customer-item">
              <div className="orderdetail__customer-label">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.RECIPIENT}
              </div>
              <div className="orderdetail__customer-value">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.RECIPIENT_VALUE}
              </div>
            </div>
            <div className="orderdetail__customer-item">
              <div className="orderdetail__customer-label">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.PHONE}
              </div>
              <div className="orderdetail__customer-value">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.PHONE_VALUE}
              </div>
            </div>
            <div className="orderdetail__customer-item">
              <div className="orderdetail__customer-label">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.EMAIL}
              </div>
              <div className="orderdetail__customer-value">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.EMAIL_VALUE}
              </div>
            </div>
          </div>
        </div>

        <div className="orderdetail__section">
          <div className="orderdetail__section-header">
            <h2 className="orderdetail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.SHIPPING}
            </h2>
          </div>
          <div className="orderdetail__section-divider"></div>

          <div className="orderdetail__shipping-info">
            <div className="orderdetail__shipping-item">
              <div className="orderdetail__shipping-label">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.RECIPIENT}
              </div>
              <div className="orderdetail__shipping-value">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.RECIPIENT_VALUE}
              </div>
            </div>
            <div className="orderdetail__shipping-item">
              <div className="orderdetail__shipping-label">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.PHONE}
              </div>
              <div className="orderdetail__shipping-value">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.PHONE_VALUE}
              </div>
            </div>
            <div className="orderdetail__shipping-item">
              <div className="orderdetail__shipping-label">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.ADDRESS}
              </div>
              <div className="orderdetail__shipping-value">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.ADDRESS_VALUE}
              </div>
              <button
                type="button"
                className="orderdetail__shipping-change-button"
              >
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.CHANGE_BUTTON}
              </button>
            </div>
            <div className="orderdetail__shipping-item">
              <div className="orderdetail__shipping-label">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.REQUEST}
              </div>
              <div className="orderdetail__shipping-value">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.REQUEST_VALUE}
              </div>
            </div>
          </div>

          <div className="orderdetail__notice">
            <p className="orderdetail__notice-text">
              {ORDERDETAIL_CONSTANTS.NOTICE.TEXT_1}
              <br />
              {ORDERDETAIL_CONSTANTS.NOTICE.TEXT_2}
            </p>
          </div>
        </div>

        <div className="orderdetail__section">
          <div className="orderdetail__section-header">
            <h2 className="orderdetail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.PAYMENT}
            </h2>
          </div>
          <div className="orderdetail__section-divider"></div>

          <div className="orderdetail__payment-info">
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.METHOD}
              </div>
              <div className="orderdetail__payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.METHOD_VALUE}
              </div>
            </div>
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.ORDER_STATUS}
              </div>
              <div className="orderdetail__payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.STATUS_VALUE}
              </div>
            </div>
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.ORDER_DATE}
              </div>
              <div className="orderdetail__payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.ORDER_DATE_VALUE}
              </div>
            </div>
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.PAYMENT_DATE}
              </div>
              <div className="orderdetail__payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.PAYMENT_DATE_VALUE}
              </div>
            </div>
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.SHIPPING_FEE}
              </div>
              <div className="orderdetail__payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.SHIPPING_FEE_VALUE}
              </div>
            </div>
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.TOTAL_AMOUNT}
              </div>
              <div className="orderdetail__payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.TOTAL_AMOUNT_VALUE}
              </div>
            </div>
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.RECEIPT}
              </div>
              <button type="button" className="orderdetail__receipt-button">
                {ORDERDETAIL_CONSTANTS.PAYMENT.RECEIPT_BUTTON}
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default OrderDetail;
