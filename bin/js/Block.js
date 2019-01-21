var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    //-----init---
    function Block() {
        var _this = _super.call(this) || this;
        _this.xx = 0;
        _this.yy = 0;
        _this.num = 0;
        _this.speed = 0;
        _this.isMove = false;
        _this.targetX = 0;
        _this.targetY = 0;
        _this.mouseEnabled = true;
        _this.size(140, 140);
        return _this;
    }
    return Block;
}(Laya.Sprite));
//# sourceMappingURL=Block.js.map