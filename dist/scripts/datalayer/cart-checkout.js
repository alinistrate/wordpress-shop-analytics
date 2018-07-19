"use strict";

!function(e) {
    function t() {
        if (u.length) {
            var e = d.checkout.dataInit;
            e.ecommerce.checkout.actionField.step = 1, e.ecommerce.checkout.products = d.getProductsData(u), 
            localStorage.setItem("productsInCartData", JSON.stringify(d.getProductsData(u))), 
            d.postToDataLayer(e);
        }
    }
    function c() {
        d.updateCartItemsQuantity(u), localStorage.setItem("productsInCartData", JSON.stringify(d.getProductsData(u)));
    }
    function o() {
        var t = e(d.cart.elements.shippingMethodSelected);
        if (t) {
            var c = "", o = "";
            if (t.is("select")) o = t.find("option:selected").text(); else {
                if ("radio" !== t.attr("type")) return;
                if (!(c = t.attr("id"))) return;
                o = e('label[for="' + c + '"]').text();
            }
            i(shop_analytics_checkout_steps.order, o);
        }
    }
    function s() {
        if (l) return void (l = !1);
        var t = e(d.checkout.elements.paymentMethodSelected).attr("id");
        t && i(shop_analytics_checkout_steps.order, e('label[for="' + t + '"]').text());
    }
    function a() {
        JSON.parse(localStorage.getItem("productsInCartData")) && n(e(d.checkout.elements.billingAddressFieldsRequired)) && i(shop_analytics_checkout_steps.order);
    }
    function r() {
        if (JSON.parse(localStorage.getItem("productsInCartData")) && n(e(d.checkout.elements.shippingAddressFieldsRequired))) {
            var t = e(d.checkout.elements.shippingAddressToggle).is(":checked") ? d.checkout.messages.shipToDifferentAddress : d.checkout.messages.shipToSameAddress;
            i(shop_analytics_checkout_steps.order, t);
        }
    }
    function n(t) {
        var c = !0;
        return t.each(function() {
            e(this).val().trim().length || (c = !1);
        }), c;
    }
    function i(e, t) {
        var c = JSON.parse(localStorage.getItem("productsInCartData"));
        if (c) {
            var o = d.checkout.dataInit;
            o.ecommerce.checkout.actionField.step = e, t && (o.ecommerce.checkout.option = t.trim()), 
            o.ecommerce.checkout.products = c, d.postToDataLayer(o);
        }
    }
    var d = document.shopAnalytics, u = e(d.cart.elements.product), l = !0;
    e(t), e(document.body).on("updated_cart_totals", c).on("updated_shipping_method", o).on("payment_method_selected", s).on("change", d.checkout.elements.billingAddressFields, a).on("change", d.checkout.elements.shippingAddressFields, r), 
    e("form.checkout").on("change", d.checkout.elements.shippingMethods, o);
}(jQuery);
