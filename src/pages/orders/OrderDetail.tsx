import Icon from "@components/icons/SvgIcon";
import Layout from "@components/Layout";
import { ORDERDETAIL_CONSTANTS } from "@constants";
import "@styles/orderdetail.css";

const OrderDetail = () => {
  return (
    <Layout showMyPageSidebar={true}>
      <div className="orderdetail-container">
        <div className="orderdetail-grade-section">
          <div className="orderdetail-grade-item orderdetail-grade-item-standard">
            <div className="orderdetail-grade-header">
              <div className="orderdetail-grade-label">
                {ORDERDETAIL_CONSTANTS.GRADE.LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderdetail-grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderdetail-grade-footer">
              <div className="orderdetail-grade-value">
                {ORDERDETAIL_CONSTANTS.GRADE.VALUE}
              </div>
              <div className="orderdetail-grade-benefit-button">
                {ORDERDETAIL_CONSTANTS.GRADE.BENEFIT_BUTTON}
              </div>
            </div>
          </div>
          <div className="orderdetail-grade-item orderdetail-grade-item-standard">
            <div className="orderdetail-grade-header">
              <div className="orderdetail-grade-label">
                {ORDERDETAIL_CONSTANTS.GRADE.COUPON_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderdetail-grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderdetail-grade-footer">
              <div className="orderdetail-grade-value">4</div>
            </div>
          </div>
          <div className="orderdetail-grade-item orderdetail-grade-item-standard">
            <div className="orderdetail-grade-header">
              <div className="orderdetail-grade-label">
                {ORDERDETAIL_CONSTANTS.GRADE.MILEAGE_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderdetail-grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderdetail-grade-footer">
              <div className="orderdetail-grade-value">0</div>
            </div>
          </div>
        </div>

        <div className="orderdetail-section">
          <div className="orderdetail-section-header">
            <div className="orderdetail-section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.ORDER_DETAIL}
            </div>
          </div>

          <div className="orderdetail-progress">
            <div className="orderdetail-progress-item">
              <div className="orderdetail-progress-circle">0</div>
              <div className="orderdetail-progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.PAYMENT_PENDING}
              </div>
            </div>
            <Icon
              name="arrowRight"
              size={30}
              className="orderdetail-progress-arrow"
              color="black"
            />
            <div className="orderdetail-progress-item active">
              <div className="orderdetail-progress-circle">1</div>
              <div className="orderdetail-progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.PAYMENT_COMPLETED}
              </div>
            </div>
            <Icon
              name="arrowRight"
              size={30}
              className="orderdetail-progress-arrow"
              color="black"
            />
            <div className="orderdetail-progress-item">
              <div className="orderdetail-progress-circle">0</div>
              <div className="orderdetail-progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.PRODUCT_PREPARING}
              </div>
            </div>
            <Icon
              name="arrowRight"
              size={30}
              className="orderdetail-progress-arrow"
              color="black"
            />
            <div className="orderdetail-progress-item">
              <div className="orderdetail-progress-circle">0</div>
              <div className="orderdetail-progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.SHIPPING_START}
              </div>
            </div>
            <Icon
              name="arrowRight"
              size={30}
              className="orderdetail-progress-arrow"
              color="black"
            />
            <div className="orderdetail-progress-item">
              <div className="orderdetail-progress-circle">0</div>
              <div className="orderdetail-progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.SHIPPING}
              </div>
            </div>
            <Icon
              name="arrowRight"
              size={30}
              className="orderdetail-progress-arrow"
              color="black"
            />
            <div className="orderdetail-progress-item">
              <div className="orderdetail-progress-circle">0</div>
              <div className="orderdetail-progress-label">
                {ORDERDETAIL_CONSTANTS.PROGRESS.DELIVERED}
              </div>
            </div>
          </div>
        </div>

        <div className="orderdetail-section">
          <div className="orderdetail-section-header">
            <div className="orderdetail-section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.ORDER_PRODUCT}
            </div>
          </div>

          <div className="orderdetail-order-header">
            <div className="orderdetail-order-date">
              {ORDERDETAIL_CONSTANTS.ORDER.DATE_LABEL}{" "}
              <span className="orderdetail-order-date-value">
                {ORDERDETAIL_CONSTANTS.ORDER.DATE_VALUE}
              </span>{" "}
              {ORDERDETAIL_CONSTANTS.ORDER.NUMBER_LABEL}{" "}
              <span className="orderdetail-order-number">
                {ORDERDETAIL_CONSTANTS.ORDER.NUMBER_VALUE}
              </span>
            </div>
          </div>

          <div className="orderdetail-order-detail">
            <div className="orderdetail-order-product">
              <div className="orderdetail-order-image">
                <Icon name="image" size={60} />
              </div>
              <div className="orderdetail-order-info">
                <div className="orderdetail-order-brand">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.BRAND_1}
                </div>
                <div className="orderdetail-order-name">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.NAME}
                </div>
                <div className="orderdetail-order-option">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.OPTION}
                </div>
                <div className="orderdetail-order-price">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.PRICE_1}
                </div>
              </div>

              <div className="orderdetail-order-quantity">
                {ORDERDETAIL_CONSTANTS.PRODUCT.QUANTITY_1}
              </div>
              <div className="orderdetail-order-shipping">
                {ORDERDETAIL_CONSTANTS.SHIPPING.LABEL} <br />
                {ORDERDETAIL_CONSTANTS.SHIPPING.FEE}
              </div>
              <div className="orderdetail-order-status">
                {ORDERDETAIL_CONSTANTS.STATUS.PAYMENT_COMPLETED}
              </div>
              <div className="orderdetail-order-delivery">
                {ORDERDETAIL_CONSTANTS.SHIPPING.EXPECTED_DATE}
                <br />
                {ORDERDETAIL_CONSTANTS.SHIPPING.STATUS}
              </div>
            </div>

            <div className="orderdetail-order-actions">
              <button className="orderdetail-order-action-button">
                {ORDERDETAIL_CONSTANTS.BUTTONS.CANCEL}
              </button>
              <button className="orderdetail-order-action-button">
                {ORDERDETAIL_CONSTANTS.BUTTONS.INQUIRY}
              </button>
            </div>
          </div>

          <div className="orderdetail-order-detail">
            <div className="orderdetail-order-product">
              <div className="orderdetail-order-image">
                <Icon name="image" size={60} />
              </div>
              <div className="orderdetail-order-info">
                <div className="orderdetail-order-brand">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.BRAND_2}
                </div>
                <div className="orderdetail-order-name">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.NAME}
                </div>
                <div className="orderdetail-order-option">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.OPTION}
                </div>
                <div className="orderdetail-order-price">
                  {ORDERDETAIL_CONSTANTS.PRODUCT.PRICE_2}
                </div>
              </div>

              <div className="orderdetail-order-quantity">
                {ORDERDETAIL_CONSTANTS.PRODUCT.QUANTITY_2}
              </div>
              <div className="orderdetail-order-shipping">
                {ORDERDETAIL_CONSTANTS.SHIPPING.LABEL} <br />
                {ORDERDETAIL_CONSTANTS.SHIPPING.FEE}
              </div>
              <div className="orderdetail-order-status">
                {ORDERDETAIL_CONSTANTS.STATUS.PAYMENT_COMPLETED}
              </div>
              <div className="orderdetail-order-delivery">
                {ORDERDETAIL_CONSTANTS.SHIPPING.EXPECTED_DATE}
                <br />
                {ORDERDETAIL_CONSTANTS.SHIPPING.STATUS}
              </div>
            </div>

            <div className="orderdetail-order-actions">
              <button className="orderdetail-order-action-button">
                {ORDERDETAIL_CONSTANTS.BUTTONS.CANCEL}
              </button>
              <button className="orderdetail-order-action-button">
                {ORDERDETAIL_CONSTANTS.BUTTONS.INQUIRY}
              </button>
            </div>
          </div>
        </div>

        <div className="orderdetail-section">
          <div className="orderdetail-section-header">
            <div className="orderdetail-section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.CUSTOMER}
            </div>
          </div>

          <div className="orderdetail-customer-info">
            <div className="orderdetail-customer-item">
              <div className="orderdetail-customer-label">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.RECIPIENT}
              </div>
              <div className="orderdetail-customer-value">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.RECIPIENT_VALUE}
              </div>
            </div>
            <div className="orderdetail-customer-item">
              <div className="orderdetail-customer-label">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.PHONE}
              </div>
              <div className="orderdetail-customer-value">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.PHONE_VALUE}
              </div>
            </div>
            <div className="orderdetail-customer-item">
              <div className="orderdetail-customer-label">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.EMAIL}
              </div>
              <div className="orderdetail-customer-value">
                {ORDERDETAIL_CONSTANTS.CUSTOMER.EMAIL_VALUE}
              </div>
            </div>
          </div>
        </div>

        <div className="orderdetail-section">
          <div className="orderdetail-section-header">
            <div className="orderdetail-section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.SHIPPING}
            </div>
          </div>
          <div className="orderdetail-section-divider"></div>

          <div className="orderdetail-shipping-info">
            <div className="orderdetail-shipping-item">
              <div className="orderdetail-shipping-label">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.RECIPIENT}
              </div>
              <div className="orderdetail-shipping-value">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.RECIPIENT_VALUE}
              </div>
            </div>
            <div className="orderdetail-shipping-item">
              <div className="orderdetail-shipping-label">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.PHONE}
              </div>
              <div className="orderdetail-shipping-value">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.PHONE_VALUE}
              </div>
            </div>
            <div className="orderdetail-shipping-item">
              <div className="orderdetail-shipping-label">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.ADDRESS}
              </div>
              <div className="orderdetail-shipping-value">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.ADDRESS_VALUE}
              </div>
              <button className="orderdetail-shipping-change-button">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.CHANGE_BUTTON}
              </button>
            </div>
            <div className="orderdetail-shipping-item">
              <div className="orderdetail-shipping-label">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.REQUEST}
              </div>
              <div className="orderdetail-shipping-value">
                {ORDERDETAIL_CONSTANTS.SHIPPING_INFO.REQUEST_VALUE}
              </div>
            </div>
          </div>

          <div className="orderdetail-notice">
            <div className="orderdetail-notice-text">
              {ORDERDETAIL_CONSTANTS.NOTICE.TEXT_1}
              <br />
              {ORDERDETAIL_CONSTANTS.NOTICE.TEXT_2}
            </div>
          </div>
        </div>

        <div className="orderdetail-section">
          <div className="orderdetail-section-header">
            <div className="orderdetail-section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.PAYMENT}
            </div>
          </div>
          <div className="orderdetail-section-divider"></div>

          <div className="orderdetail-payment-info">
            <div className="orderdetail-payment-item">
              <div className="orderdetail-payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.METHOD}
              </div>
              <div className="orderdetail-payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.METHOD_VALUE}
              </div>
            </div>
            <div className="orderdetail-payment-item">
              <div className="orderdetail-payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.ORDER_STATUS}
              </div>
              <div className="orderdetail-payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.STATUS_VALUE}
              </div>
            </div>
            <div className="orderdetail-payment-item">
              <div className="orderdetail-payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.ORDER_DATE}
              </div>
              <div className="orderdetail-payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.ORDER_DATE_VALUE}
              </div>
            </div>
            <div className="orderdetail-payment-item">
              <div className="orderdetail-payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.PAYMENT_DATE}
              </div>
              <div className="orderdetail-payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.PAYMENT_DATE_VALUE}
              </div>
            </div>
            <div className="orderdetail-payment-item">
              <div className="orderdetail-payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.SHIPPING_FEE}
              </div>
              <div className="orderdetail-payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.SHIPPING_FEE_VALUE}
              </div>
            </div>
            <div className="orderdetail-payment-item">
              <div className="orderdetail-payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.TOTAL_AMOUNT}
              </div>
              <div className="orderdetail-payment-value">
                {ORDERDETAIL_CONSTANTS.PAYMENT.TOTAL_AMOUNT_VALUE}
              </div>
            </div>
            <div className="orderdetail-payment-item">
              <div className="orderdetail-payment-label">
                {ORDERDETAIL_CONSTANTS.PAYMENT.RECEIPT}
              </div>
              <button className="orderdetail-receipt-button">
                {ORDERDETAIL_CONSTANTS.PAYMENT.RECEIPT_BUTTON}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
