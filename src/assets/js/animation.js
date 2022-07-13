
export default function animation(obj,target,callback) {
    if(obj){
        if(obj.timer) {
            clearInterval(obj.timer)
        }
        obj.timer = setInterval(function(){
        // 缓动动画公式:(目标值-当前位置) / 10
        // 把步长取整,防止没有达到target值,向上取整
        var step = (target-obj.offsetLeft) / 15
        step = step >= 0 ? Math.ceil(step) : Math.floor(step)
        if(obj.offsetLeft == target) {
            clearInterval(obj.timer)
            if(callback)
                callback()
        }
            obj.style.left = obj.offsetLeft + step + 'px'
            // var a = obj.offsetLeft + step + 'px'
        }, 15);
    }
}