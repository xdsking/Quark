document.attachEvent && alert("这个例子不支持 Old IE 哦"), define("examples/lucky/1.0.0/main", ["./data", "./lucky", "jquery", "jquery-easing", "./user"], function (a) {
    var b = a("./data"), c = a("./lucky");
    c.init(b)
}), define("examples/lucky/1.0.0/data", [], ["梓胥", "李磊", "俊义", "兰玉", "泥巴", "对剑", "希普", "牧木", "夏雩", "衡芜", "钝刀", "苍新", "琳心", "玉鼎", "冯衡", "伍举", "长松", "卫海", "伯川", "道潜", "丁勉", "竹棒", "妙才", "许由", "祢衡", "赵盾", "斗子文", "寇恂", "极天", "秦天", "裴秀", "花朝", "静俭", "墨颜", "王维", "马武", "公孙龙", "甘德", "流珠", "路悠", "樽空", "沐峰", "清筠", "绝伦", "星辰", "羽单", "伯兮", "郝思文", "聂壹", "南岸", "明恽", "君乾", "飞天", "文赢", "义均", "文和", "曹彬", "晁错", "兔葵", "苏星河", "太常", "北湖", "弘殷", "吕蒙", "颜良", "庄辛", "崇幻", "贝儿", "柏平", "小毛", "战尘", "子盛", "问柏", "湛然", "独慕", "浴尘", "公与", "桑美", "晏婴", "严成方", "连挚", "汪信之", "楚天", "良臣", "暮城", "塔石", "薇达", "行洋", "明何", "昔空", "蓝玉", "韩当", "丛英", "吞佛", "真岚", "仲文", "吕方", "郑天寿", "一恒", "誉少", "无竞", "九弦", "玉伯", "冒顿", "啸生", "尹曰", "臻儿", "籽沐", "余化", "玉郎", "右丞", "默哈", "血诺", "桐杰", "镜曦", "沉鱼", "贯高", "陆辉", "浩初", "天材", "偏右", "云谦", "乔花", "展新", "张初尘", "宫煌", "宗玄", "一正", "若夷", "普渡", "晴汐", "徒离", "仲景", "大禹", "徐盛", "木合", "郭淮", "方嘉", "李渔", "长皓", "渔樵", "惜年", "沧溟", "东隅", "海涛", "磻溪"]), define("examples/lucky/1.0.0/lucky", ["jquery", "jquery-easing", "examples/lucky/1.0.0/user"], function (a, b, c) {
    function d(a, b) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
    }

    function e(a, b) {
        return d(a, b) <= (a.width + b.width) / 2
    }

    function f(a, b) {
        var c = b.y - a.y, e = b.x - a.x, f = d(a, b), g = Math.ceil(((a.width + b.width) / 2 - f) / j), h = c > 0 ? Math.ceil(g * c / f) : Math.floor(g * c / f), i = e > 0 ? Math.ceil(g * e / f) : Math.floor(g * e / f);
        a.lucky ? (b._xMove += 2 * i, b._yMove += 2 * h) : b.lucky ? (a._xMove += -2 * i, a._yMove += -2 * h) : (a._yMove += -1 * h, b._yMove += h, a._xMove += -1 * i, b._xMove += i)
    }

    var g = a("jquery");
    a("jquery-easing");
    var h = a("examples/lucky/1.0.0/user"), i = 100, j = 4;
    c.exports = {users: [], init: function (a) {
        g("#container").css("background", "none"), this.data = a, this.users = a.map(function (b) {
            return new h(b, a[b])
        }), this._bindUI()
    }, _bindUI: function () {
        function a() {
            "start" === c.getAttribute("data-action") ? (c.setAttribute("data-action", "stop"), c.innerHTML = c.getAttribute("data-text-stop"), b.start()) : (c.setAttribute("data-action", "start"), c.innerHTML = c.getAttribute("data-text-start"), b.stop())
        }

        var b = this, c = document.querySelector("#go");
        c.innerHTML = c.getAttribute("data-text-start"), c.addEventListener("click", a, !1), g("#lucky-balls").on("click", "li", function (a) {
            var c = g(a.target), d = c.text();
            b.addItem(d), b.hit(), c.remove()
        }), g("#balls").on("click", "li", function (a) {
            for (var c = g(a.target), d = c.text(), e = 0; e < b.users.length; e++) {
                var f = b.users[e];
                if (f.name === d) {
                    b.moveLucky(), b.luckyUser !== f && b.setLucky(f);
                    break
                }
            }
        }), document.addEventListener("keydown", function (c) {
            "32" == c.keyCode ? a() : "27" == c.keyCode && (b.moveLucky(), g("#lucky-balls li").eq(0).click())
        }, !1)
    }, start: function () {
        this.timer && clearTimeout(this.timer), this.moveLucky(), this.users.forEach(function (a) {
            a.start()
        })
    }, stop: function () {
        var a = this.users, b = 0, c = a[0];
        a.forEach(function (a) {
            a.stop(), b < a.zIndex && (c = a, b = a.zIndex)
        }), c.bang(), this.hit(), this.luckyUser = c
    }, removeItem: function (a) {
        for (var b = 0; b < this.users.length; b++) {
            var c = this.users[b];
            c === a && this.users.splice(b, 1)
        }
    }, addItem: function (a) {
        this.users.push(new h(a))
    }, moveLucky: function () {
        var a = this.luckyUser;
        a && (a.el[0].style.cssText = "", a.el.prependTo("#lucky-balls"), this.removeItem(a), this.luckyUser = null)
    }, setLucky: function (a) {
        this.users.forEach(function (a) {
            a.stop()
        }), this.luckyUser = a, a.bang(), this.hit()
    }, hit: function () {
        var a = this, b = 0, c = this.users;
        c.forEach(function (a) {
            a.beginHit()
        });
        for (var d = 0; d < c.length; d++)for (var g = d + 1; g < c.length; g++)e(c[d], c[g]) && (f(c[d], c[g]), b++);
        c.forEach(function (a) {
            a.hitMove()
        }), b > 0 && (this.timer = setTimeout(function () {
            a.hit()
        }, i))
    }}
}), define("examples/lucky/1.0.0/user", ["jquery"], function (a, b, c) {
    function d(a, b) {
        this.name = a, this.options = b || {}, this.el = null, this.width = 0, this.height = 0, this.left = 0, this.top = 0, this.x = 0, this.y = 0, this.moving = !1, this.lucky = !1, this.createEl(), this.move()
    }

    function e(a, b) {
        return a = a || 0, b = b || 1, Math.floor(Math.random() * (b - a + 1) + a)
    }

    var f = a("jquery"), g = 500, h = 900, i = 40, j = 40, k = 120, l = 120, m = 100, n = 100, o = 500, p = 500;
    c.exports = d, d.prototype.createEl = function () {
        this.el = f("<li>" + this.name + "</li>").appendTo("#balls"), this.width = this.el.width(), this.height = this.el.height()
    }, d.prototype.move = function (a) {
        this.left = e(0, h - this.width), this.top = e(0, g - this.height), this.zIndex = e(0, m), this.reflow(a)
    }, d.prototype.reflow = function (a, b) {
        this.x = this.left + this.width / 2, this.y = this.top + this.height / 2, this.el[0].style.zIndex = this.zIndex, b ? (this.el[0].style.left = this.left, this.el[0].style.top = this.top) : this.el.animate({left: this.left, top: this.top}, e(n, o), "easeOutBack", a)
    }, d.prototype.start = function () {
        this.reset(), this.moving = !0, this.autoMove()
    }, d.prototype.reset = function () {
        this.el.stop(!0, !0), this.lucky = !1, this.el[0].className = "", this.el[0].style.width = i + "px", this.el[0].style.height = j + "px", this.width = this.el.width(), this.height = this.el.height(), this._maxTop = g - this.height, this._maxLeft = h - this.width
    }, d.prototype.autoMove = function () {
        var a = this;
        this.moving && this.move(function () {
            a.autoMove()
        })
    }, d.prototype.stop = function () {
        this.el.stop(!0, !0), this.moving = !1
    }, d.prototype.bang = function () {
        this.lucky = !0, this.el[0].className = "selected", this.width = k, this.height = l, this.left = (h - this.width) / 2, this.top = (g - this.height) / 2, this.el.animate({left: this.left, top: this.top, width: this.width, height: this.height}, p)
    }, d.prototype.beginHit = function () {
        this._xMove = 0, this._yMove = 0
    }, d.prototype.hitMove = function () {
        this.left += this._xMove, this.top += this._yMove, this.top = this.top < 0 ? 0 : this.top > this._maxTop ? this._maxTop : this.top, this.left = this.left < 0 ? 0 : this.left > this._maxLeft ? this._maxLeft : this.left, this.reflow(null, !1)
    }
});
