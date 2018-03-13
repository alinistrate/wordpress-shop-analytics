'use strict';

(function (dataLayer, $) {
  var shopAnalytics = document.shopAnalytics;

  $(onLoad);
  $(document)
    .on('change', '.cart .quantity .qty', updateProductQuantity)
    .on('click', '.single_add_to_cart_button', onProductAddToCart);

  /**
   * Reacts to loading of a product details page.
   */
  function onLoad() {
    var $products = $('.cart .shop-analytics-product-details');
    // Get the list type where this product was displayed on when clicked.
    var list_type = Cookies.get('shop-analytics-list-type');
    var event_data = {
      'event': 'EECproductDetailView',
      'ecommerce': {
        'detail': {
          'actionField': {
            'list': 'Product detail'
          },
          'products': shopAnalytics.getProductsData($products)
        }
      }
    };
    if (list_type) {
      event_data.ecommerce.detail.actionField.list = list_type;
      Cookies.remove('shop-analytics-list-type');
    }
    shopAnalytics.postToDataLayer(dataLayer, event_data);
  }

  /**
   * Updates product quantity data attribute.
   */
  function updateProductQuantity() {
    var $this = $(this);
    $this.closest('.quantity').siblings('.shop-analytics-product-details').data('quantity', $this.val());
  }

  /**
   * Reacts to adding a product to cart.
   */
  function onProductAddToCart() {
    var $this = $(this);
    if ($this.is('.disabled')) {
      return;
    }
    var $products = $('.cart .shop-analytics-product-details');
    var variation;
    var event_data = {
      'event': 'EECaddToCart',
      'ecommerce': {
        'currencyCode': $products.first().data('currency'),
        'add': {
          'products': shopAnalytics.getProductsData($products)
        }
      }
    };

    shopAnalytics.postToDataLayer(dataLayer, event_data);
  };

  /**
   * Retrieves the selected variation attributes names.
   *
   * @return string
   *   Comma-separated list of selected variation attributes.
   */
  function getProductVariationAttributes() {
    var variation = '';

    $('.variations_form option:selected').each(function () {
      if ($(this).val().trim()) {
        variation += $(this).text().trim() + ', ';
      }
    });
    return variation.slice(0, -2);
  }

})(window.dataLayer, jQuery);