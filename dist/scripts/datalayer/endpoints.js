"use strict";!function(s){var i=document.shopAnalytics;s(function(){"order-received"===shop_analytics_endpoint_data.step&&function(){var e=s(document).find(".shop-analytics-order-details"),t=e.data(),a=String(t.id),r=JSON.parse(localStorage.getItem("shop-analytics-tracked-orders")),o=localStorage.getItem("shop-analytics-order-count")?JSON.parse(localStorage.getItem("shop-analytics-order-count"))+1:t.order_count;{if(r&&r.includes(a))return;r.push(a),localStorage.setItem("shop-analytics-tracked-orders",JSON.stringify(r)),localStorage.setItem("shop-analytics-order-count",JSON.stringify(o))}var c=e.find(".shop-analytics-product-details"),n={event:"EECpurchase",ecommerce:{purchase:{actionField:{id:a,revenue:String(t.revenue).replace(/,/g,""),tax:String(t.tax).replace(/,/g,""),shipping:String(t.shipping).replace(/,/g,""),ordercount:o},products:i.getProductsData(c)}}};t.coupon&&(n.ecommerce.purchase.actionField.coupon=t.coupon);i.postToDataLayer(n)}()})}(jQuery);
