(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{371:function(t,i,n){"use strict";n(342),n(7);var e={name:"ALink",props:{href:String,to:[String,Object]},computed:{isRouter:function(){var t=this;return!!this.$router&&(!this.href||Boolean(this.$router.options.routes.find((function(i){return i.path===t.href}))))}}},s=n(55),r=Object(s.a)(e,(function(){var t=this.$createElement;return(this._self._c||t)(this.isRouter?"router-link":"a",{tag:"component",attrs:{href:this.isRouter?null:this.href,to:this.isRouter?this.to||this.href:null}},[this._t("default")],2)}),[],!1,null,null,null);i.a=r.exports},372:function(t,i,n){"use strict";var e=n(349),s=n(109),r=n(113),o=n(402),a=(n(30),n(83),n(82),n(344),n(350),n(367),n(114),n(471),n(338)),c=n(370),u=n.n(c),l={name:"APicture",props:{src:[String,Object],fallbackSrc:String,alt:String,canCalcHeight:{type:Boolean,default:!0},placeholder:{type:String,default:"/assets/img-placeholder.png"},containerBreakpoints:{type:Object,default:function(){return Object(o.a)({zoom:null,big:800},a.$ecomConfig.get("default_img_size")||"normal",400)}},lozadOptions:{type:Object,default:function(){return{rootMargin:"350px 0px",threshold:0}}}},data:function(){return{sources:[],imgWidth:0,imgHeight:0,height:null,opacity:null}},computed:{defaultImgObj:function(){return"object"===Object(r.a)(this.src)&&this.src?Object(a.img)(this.src)||this.src:{}},localFallbackSrc:function(){var t=this.src,i=this.defaultImgObj,n=this.fallbackSrc;if(n)return n;var e="object"===Object(r.a)(t)?t.zoom?t.zoom.url:i.url:t;return e?e.replace(/\.webp$/,""):this.placeholder},localAlt:function(){var t=this.alt,i=this.src,n=this.defaultImgObj;return t||(i?n.alt||"Product":"No image")}},methods:{updateSources:function(){var t,i=[];if("object"===Object(r.a)(this.src)){var n=this.$el,e=n.clientWidth,o=n.clientHeight,a=function(t,i,n,e){var s,r;for(var o in e){var a=e[o];if(void 0!==a&&t[o]){if(void 0!==r)if(null===a){if(r>=i)continue}else if(a<i||a-50<=n||null!==r&&a>r)continue;s=o,r=a}}return s}(this.src,e,o,this.containerBreakpoints),c=this.src[a]||this.defaultImgObj,u=c.url,l=c.size;if(t=u,l){var d=l.split("x").map((function(t){return parseInt(t,10)})),p=Object(s.a)(d,2);this.imgWidth=p[0],this.imgHeight=p[1],e&&this.imgHeight&&this.canCalcHeight&&(this.height=(e>=this.imgWidth?this.imgHeight:e*this.imgHeight/this.imgWidth)+"px")}}else t=this.src;t&&(t.endsWith(".webp")?i.push({srcset:t,type:"image/webp"},{srcset:/\/imgs\/[0-9]{3}px/.test(t)?t.replace(/\/imgs\/[0-9]{3}px/,""):t.replace(/\.webp$/,""),type:"image/".concat(".png"===t.substr(-9,4)?"png":"jpeg")}):i.push({srcset:t})),this.sources=i}},mounted:function(){var t=this;this.updateSources(),this.$nextTick((function(){var i=t.$el;u()(i,Object(e.a)(Object(e.a)({},t.lozadOptions),{},{loaded:function(i){var n=t.localFallbackSrc,e="IMG"===i.tagName?i:i.lastChild;e.style.opacity=0,t.imgHeight&&(e.height=t.imgHeight,e.width=t.imgWidth),e.onerror=function(){console.error(new Error("Image load error"),this),i.style.display="none";var t=document.createElement("IMG");t.src=n,i.parentNode.insertBefore(t,i.nextSibling)},e.onload=function(){t.opacity=0,i.classList.add("loaded"),t.$nextTick((function(){t.opacity=e.style.opacity=null,t.$emit("load")}))}}})).observe()}))}},d=(n(472),n(55)),p=Object(d.a)(l,(function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("picture",{staticClass:"picture",style:{height:t.height,opacity:t.opacity},attrs:{"data-iesrc":t.localFallbackSrc,"data-alt":t.localAlt}},[t.sources.length?t._l(t.sources,(function(t,i){var e=t.srcset,s=t.type;return n("source",{key:i,attrs:{srcset:e,type:s}})})):n("source",{attrs:{srcset:t.localFallbackSrc}})],2)}),[],!1,null,null,null);i.a=p.exports},403:function(t,i,n){},404:function(t,i,n){},405:function(t,i,n){},420:function(t,i,n){"use strict";var e=n(349),s=(n(350),n(84),n(591)),r=n(338),o=n(113),a=(n(7),n(112),function(t,i){return new Promise((function(n){var e="object"===("undefined"==typeof window?"undefined":Object(o.a)(window))&&window.storefront;if(e){var s=function(){var s=e.info&&e.info[t];return!!(s&&(i&&(s=s[i]),s&&Object.keys(s).length))&&(n(s),!0)};s()||e.on("info:".concat(t),s)}}))}),c=function(t,i){var n,e=i.type,s=i.value;if(s)return(n="percentage"===e?t*(100-s)/100:t-s)>0?n:0},u={name:"APrices",props:{product:{type:Object,required:!0},isLiteral:Boolean,isBig:Boolean,isAmountTotal:Boolean,installmentsOption:Object,discountOption:Object,discountText:{type:[String,Boolean],default:""},canShowPriceOptions:{type:Boolean,default:!0}},data:function(){return{installmentsNumber:0,monthlyInterest:0,discount:{type:null,value:0},extraDiscount:{type:null,value:0,min_amount:0},discountLabel:this.discountText,pointsProgramName:null,pointsMinPrice:0,earnPointsFactor:0}},computed:{i19asOf:function(){return Object(r.i18n)(s.c)},i19from:function(){return Object(r.i18n)(s.w)},i19interestFree:function(){return Object(r.i18n)(s.z)},i19of:function(){return Object(r.i18n)(s.J)},i19to:function(){return Object(r.i18n)(s.qb)},i19upTo:function(){return Object(r.i18n)(s.vb)},i19youEarn:function(){return Object(r.i18n)(s.yb)},price:function(){var t=Object(r.price)(this.product);return this.extraDiscount.value&&(!this.extraDiscount.min_amount||t>this.extraDiscount.min_amount)?c(t,this.extraDiscount):t},comparePrice:function(){return Object(r.onPromotion)(this.product)?this.product.base_price:this.extraDiscount.value?Object(r.price)(this.product):void 0},hasVariedPrices:function(){var t=this.product.variations;if(t)for(var i=Object(r.price)(this.product),n=0;n<t.length;n++){if(Object(r.price)(Object(e.a)(Object(e.a)({},this.product),t[n]))>i)return!0}return!1},priceWithDiscount:function(){return this.canShowPriceOptions&&c(this.price,this.discount)},installmentValue:function(){if(this.canShowPriceOptions&&this.installmentsNumber>=2){if(this.monthlyInterest){var t=this.monthlyInterest/100;return this.price*t/(1-Math.pow(1+t,-this.installmentsNumber))}return this.price/this.installmentsNumber}return 0}},methods:{formatMoney:r.formatMoney,updateInstallments:function(t){if(t){this.monthlyInterest=t.monthly_interest;var i=t.min_installment||5,n=parseInt(this.price/i,10);this.installmentsNumber=Math.min(n,t.max_number)}},updateDiscount:function(t){!t||t.min_amount&&!(t.min_amount<=this.price)||this.isAmountTotal&&"total"!==t.apply_at||(this.discount=t,!this.discountText&&!1!==this.discountText&&t.label&&(this.discountLabel="via ".concat(t.label)))}},watch:{price:{handler:function(t){this.$emit("fix-price",t)},immediate:!0}},created:function(){var t=this;this.canShowPriceOptions&&(this.discountOption?this.updateDiscount(this.discountOption):a("apply_discount").then((function(i){i.available_extra_discount&&(t.extraDiscount=i.available_extra_discount)})),this.installmentsOption?this.updateInstallments(this.installmentsOption):a("list_payments").then((function(i){t.updateInstallments(i.installments_option),t.updateDiscount(i.discount_option);var n=i.loyalty_points_programs;t.isLiteral&&n&&t.$nextTick((function(){for(var i in n){var e=n[i];if(e&&e.earn_percentage>0){t.pointsMinPrice=e.min_subtotal_to_earn,t.pointsProgramName=e.name,t.earnPointsFactor=e.earn_percentage/100;break}}}))})))}},l=(n(473),n(55)),d=Object(l.a)(u,(function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"prices",class:{"prices--literal":t.isLiteral,"prices--big":t.isBig}},[t.comparePrice?n("span",{staticClass:"prices__compare"},[t.isLiteral?[n("small",[t._v("\n        "+t._s(t.i19from)+"\n      ")]),t._v(" "),n("s",[t._v(t._s(t.formatMoney(t.comparePrice)))]),t._v(" "),n("small",[t._v("\n        "+t._s(t.i19to)+"\n      ")])]:n("s",[t._v(t._s(t.formatMoney(t.comparePrice)))])],2):t._e(),t._v(" "),n("strong",{staticClass:"prices__value"},[t.hasVariedPrices?n("small",[t._v("\n      "+t._s(t.i19asOf)+"\n    ")]):t._e(),t._v("\n    "+t._s(t.formatMoney(t.price))+"\n  ")]),t._v(" "),n("transition-group",{attrs:{"enter-active-class":"animated slideInDown"}},[t.earnPointsFactor>0&&!(t.pointsMinPrice>t.price)?n("div",{key:"points",staticClass:"prices__points"},[n("i",{staticClass:"i-check-circle"}),t._v("\n      "+t._s(t.i19youEarn)+"\n      "),n("span",[t._v("\n        +"+t._s((t.earnPointsFactor*t.price).toFixed(1))+"\n      ")]),t._v(" "),n("em",[t._v(t._s(t.pointsProgramName))])]):t._e(),t._v(" "),t.installmentsNumber>1&&t.installmentValue?n("div",{key:"installments",staticClass:"prices__installments"},[t.isLiteral?n("small",[t._v("\n        "+t._s(t.i19upTo)+"\n      ")]):t._e(),t._v("\n      "+t._s(t.installmentsNumber)+"x\n      "),t.isLiteral?n("small",[t._v("\n        "+t._s(t.i19of)+"\n      ")]):t._e(),t._v(" "),n("span",[t._v("\n        "+t._s(t.formatMoney(t.installmentValue))+"\n      ")]),t._v(" "),!t.monthlyInterest&&t.isLiteral?n("small",[t._v("\n        "+t._s(t.i19interestFree)+"\n      ")]):t._e()]):t._e(),t._v(" "),"number"==typeof t.priceWithDiscount&&t.priceWithDiscount<t.price?n("div",{key:"discount",staticClass:"prices__discount"},["string"==typeof t.discountLabel&&t.discountLabel?[n("span",[t._v("\n          "+t._s(t.formatMoney(t.priceWithDiscount))+"\n        ")]),t._v(" "),n("small",{staticClass:"prices__discount-label"},[t._v("\n          "+t._s(t.discountLabel)+"\n        ")])]:[n("small",[t._v("\n          "+t._s(t.i19asOf)+"\n        ")]),t._v(" "),n("span",[t._v("\n          "+t._s(t.formatMoney(t.priceWithDiscount))+"\n        ")])]],2):t._e()])],1)}),[],!1,null,null,null);i.a=d.exports},421:function(t,i,n){"use strict";var e=n(349),s=n(113),r=(n(7),n(84),n(16),n(19),n(591)),o=n(338),a=n(1),c=n(360),u=n(363),l=n.n(u),d=n(371),p=n(372),h=n(420),f=function(t,i){if("object"===("undefined"==typeof window?"undefined":Object(s.a)(window))){t="productCard".concat(t,"Html");var n="function"==typeof window[t]?window[t](i):window[t];if("string"==typeof n)return n}},m={name:"ProductCard",components:{ALink:d.a,APicture:p.a,APrices:h.a},props:{product:Object,productId:String,isSmall:Boolean,headingTag:{type:String,default:"h3"},buyText:String,transitionClass:{type:String,default:"animated fadeIn"},canAddToCart:{type:Boolean,default:!0},isLoaded:Boolean,installmentsOption:Object,discountOption:Object},data:function(){return{body:{},isLoading:!1,isWaitingBuy:!1,isHovered:!1,error:""}},computed:{i19outOfStock:function(){return Object(o.i18n)(r.P)},i19unavailable:function(){return Object(o.i18n)(r.rb)},ratingHtml:function(){return f("Rating",this.body)},buyHtml:function(){return f("Buy",this.body)},footerHtml:function(){return f("Footer",this.body)},name:function(){return Object(o.name)(this.body)},strBuy:function(){return this.buyText||"object"===("undefined"==typeof window?"undefined":Object(s.a)(window))&&window.productCardBuyText||Object(o.i18n)(r.f)},isInStock:function(){return Object(o.inStock)(this.body)},isActive:function(){return this.body.available&&this.body.visible&&this.isInStock},discount:function(){var t=this.body;return Object(o.onPromotion)(t)?Math.round(100*(t.base_price-Object(o.price)(t))/t.base_price):0}},methods:{setBody:function(t){this.body=Object.assign({},t),delete this.body.body_html,delete this.body.body_text,delete this.body.inventory_records,delete this.body.price_change_records},fetchItem:function(){var t=this;this.productId&&(this.isLoading=!0,Object(c.store)({url:"/products/".concat(this.productId,".json")}).then((function(i){var n=i.data;t.$emit("update:product",n),t.setBody(n),t.$emit("update:is-loaded",!0)})).catch((function(i){console.error(i),t.body.name&&t.body.slug&&t.body.pictures||(t.error=Object(o.i18n)(r.m))})).finally((function(){t.isLoading=!1})))},buy:function(){var t=this,i=this.body;this.$emit("buy",{product:i}),this.canAddToCart&&(this.isWaitingBuy=!0,Object(c.store)({url:"/products/".concat(i._id,".json")}).then((function(s){for(var r=s.data,o=["variations","customizations","kit_composition"],c=0;c<o.length;c++){var u=r[o[c]];if(u&&u.length)return Promise.all([n.e(0),n.e(2),n.e(7),n.e(6)]).then(n.bind(null,506)).then((function(i){new a.a({render:function(t){return t(i.default,{props:{product:r}})}}).$mount(t.$refs.quickview)}))}var d=r.quantity,p=r.price;l.a.addProduct(Object(e.a)(Object(e.a)({},i),{},{quantity:d,price:p}))})).catch((function(t){console.error(t),window.location="/".concat(i.slug)})).finally((function(){t.isWaitingBuy=!1})))}},created:function(){this.product&&(this.setBody(this.product),void 0===this.product.available&&(this.body.available=!0),void 0===this.product.visible&&(this.body.visible=!0)),this.isLoaded||this.fetchItem()}},_=(n(474),n(55)),b=Object(_.a)(m,(function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"product-card",class:{"product-card--inactive":t.body._id&&!t.isActive,"product-card--small":t.isSmall},attrs:{"data-product-id":t.body._id,"data-sku":t.body.sku},on:{mouseover:function(i){t.isHovered=!0}}},[n("transition",{attrs:{"enter-active-class":t.transitionClass}},[t.isLoading?t._e():n("section",[t._t("discount-tag",(function(){return[t.isActive&&t.discount>0?n("span",{staticClass:"product-card__offer-stamp"},[n("i",{staticClass:"i-arrow-down"}),t._v(" "),n("b",[t._v(t._s(t.discount))]),t._v("%\n        ")]):t._e()]}),null,{discount:t.discount}),t._v(" "),t._t("body",(function(){return[n("a-link",{staticClass:"product-card__link",attrs:{href:"/"+t.body.slug,title:t.name}},[t._t("header"),t._v(" "),n("div",{staticClass:"product-card__pictures"},[t.body.pictures&&t.body.pictures.length?t._l(t.body.pictures.slice(0,2).reverse(),(function(i,e){return 1===t.body.pictures.length||1===e||t.isHovered?n("a-picture",{key:e,staticClass:"product-card__picture",attrs:{src:i,"can-calc-height":!1}}):t._e()})):n("a-picture",{staticClass:"product-card__picture"})],2),t._v(" "),t._t("title",(function(){return[n(t.headingTag,{tag:"component",staticClass:"product-card__name"},[t._v("\n              "+t._s(t.name)+"\n            ")])]}))],2)]})),t._v(" "),t._t("rating",(function(){return[t._m(0)]})),t._v(" "),t.body.available&&t.body.visible?t.isInStock?[t._t("prices",(function(){return[n("a-prices",{staticClass:"product-card__prices",attrs:{product:t.body,"installments-option":t.installmentsOption,"discount-option":t.discountOption}})]})),t._v(" "),n("div",{staticClass:"product-card__buy fade",on:{click:t.buy}},[t._t("buy",(function(){return[t.buyHtml?n("div",{domProps:{innerHTML:t._s(t.buyHtml)}}):t._e(),t._v(" "),n("button",{staticClass:"btn btn-primary",class:t.isSmall?"btn-sm":"btn-block",attrs:{type:"button",disabled:t.isWaitingBuy}},[t.isWaitingBuy?n("span",{staticClass:"product-card__buy-loading spinner-grow spinner-grow-sm",attrs:{role:"status"}},[n("span",{staticClass:"sr-only"},[t._v("Loading...")])]):t._e(),t._v(" "),t._t("buy-button-content",(function(){return[n("i",{staticClass:"i-shopping-bag mr-1"}),t._v("\n                "+t._s(t.strBuy)+"\n              ")]}))],2)]}))],2)]:t._t("out-of-stock",(function(){return[n("p",{staticClass:"badge badge-dark mt-auto"},[t._v("\n          "+t._s(t.i19outOfStock)+"\n        ")])]})):t._t("unavailable",(function(){return[n("p",{staticClass:"badge badge-warning mt-auto"},[t._v("\n          "+t._s(t.i19unavailable)+"\n        ")])]})),t._v(" "),t._t("footer",(function(){return[t.footerHtml?n("div",{domProps:{innerHTML:t._s(t.footerHtml)}}):t._e()]}))],2)]),t._v(" "),t.isLoading?[t._t("default"),t._v(" "),t.error?n("div",{staticClass:"alert alert-warning small",attrs:{role:"alert"}},[t._v("\n      "+t._s(t.error)+"\n    ")]):t._e()]:t._e(),t._v(" "),n("div",{ref:"quickview"})],2)}),[function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"product-card__rating",attrs:{"data-sku":this.body.sku},domProps:{innerHTML:this._s(this.ratingHtml)}})}],!1,null,null,null);i.a=b.exports},472:function(t,i,n){"use strict";n(403)},473:function(t,i,n){"use strict";n(404)},474:function(t,i,n){"use strict";n(405)}}]);