const finishLoading=(pageEl,cb)=>{authorize.loginCheck();$('.spinner').hide();$(pageEl).removeClass('loading');return isFunction(cb)?cb():false;};const isFunction=functionToCheck=>(functionToCheck&&{}.toString.call(functionToCheck)==='[object Function]');const setStarRating=()=>{const stars='.star-ratings-css';const starSetter='.star-ratings-css-top';$(stars).each((idx,star)=>{const rating=$(star).data('rating');const max=$(star).data('max');const width=`${(rating/max)*100}%`;$(star).find(starSetter).css('width',width);});};