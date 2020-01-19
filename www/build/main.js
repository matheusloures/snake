webpackJsonp([0],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_best_score_manager_best_score_manager__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(269);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(bestScoreService, navCtrl) {
        this.bestScoreService = bestScoreService;
        this.navCtrl = navCtrl;
        this.default_mode = 'classic';
        this.isGameOver = false;
        this.all_modes = __WEBPACK_IMPORTED_MODULE_3__constants__["d" /* GAME_MODES */];
        this.getKeys = Object.keys;
        this.board = [];
        this.obstacles = [];
        this.score = 0;
        this.showMenuChecker = false;
        this.gameStarted = false;
        this.newBestScore = false;
        this.best_score = this.bestScoreService.retrieve();
        this.snake = {
            direction: __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].LEFT,
            parts: [
                {
                    x: -1,
                    y: -1
                }
            ]
        };
        this.fruit = {
            x: -1,
            y: -1
        };
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.setBoard();
    };
    HomePage.prototype.handleKeyboardEvents = function (e) {
        if (e.keyCode === __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].LEFT && this.snake.direction !== __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].RIGHT) {
            this.tempDirection = __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].LEFT;
        }
        else if (e.keyCode === __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].UP && this.snake.direction !== __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].DOWN) {
            this.tempDirection = __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].UP;
        }
        else if (e.keyCode === __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].RIGHT && this.snake.direction !== __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].LEFT) {
            this.tempDirection = __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].RIGHT;
        }
        else if (e.keyCode === __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].DOWN && this.snake.direction !== __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].UP) {
            this.tempDirection = __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].DOWN;
        }
    };
    HomePage.prototype.setColors = function (col, row) {
        if (this.isGameOver) {
            return __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* COLORS */].GAME_OVER;
        }
        else if (this.fruit.x === row && this.fruit.y === col) {
            return __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* COLORS */].FRUIT;
        }
        else if (this.snake.parts[0].x === row && this.snake.parts[0].y === col) {
            return __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* COLORS */].HEAD;
        }
        else if (this.board[col][row] === true) {
            return __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* COLORS */].BODY;
        }
        else if (this.default_mode === 'obstacles' && this.checkObstacles(row, col)) {
            return __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* COLORS */].OBSTACLE;
        }
        return __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* COLORS */].BOARD;
    };
    ;
    HomePage.prototype.updatePositions = function () {
        var newHead = this.repositionHead();
        var me = this;
        if (this.default_mode === 'classic' && this.boardCollision(newHead)) {
            return this.gameOver();
        }
        else if (this.default_mode === 'no_walls') {
            this.noWallsTransition(newHead);
        }
        else if (this.default_mode === 'obstacles') {
            this.noWallsTransition(newHead);
            if (this.obstacleCollision(newHead)) {
                return this.gameOver();
            }
        }
        if (this.selfCollision(newHead)) {
            return this.gameOver();
        }
        else if (this.fruitCollision(newHead)) {
            this.eatFruit();
        }
        var oldTail = this.snake.parts.pop();
        this.board[oldTail.y][oldTail.x] = false;
        this.snake.parts.unshift(newHead);
        this.board[newHead.y][newHead.x] = true;
        this.snake.direction = this.tempDirection;
        setTimeout(function () {
            me.updatePositions();
        }, this.interval);
    };
    HomePage.prototype.repositionHead = function () {
        var newHead = Object.assign({}, this.snake.parts[0]);
        if (this.tempDirection === __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].LEFT) {
            newHead.x -= 1;
        }
        else if (this.tempDirection === __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].RIGHT) {
            newHead.x += 1;
        }
        else if (this.tempDirection === __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].UP) {
            newHead.y -= 1;
        }
        else if (this.tempDirection === __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].DOWN) {
            newHead.y += 1;
        }
        return newHead;
    };
    HomePage.prototype.noWallsTransition = function (part) {
        if (part.x === __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* BOARD_SIZE */]) {
            part.x = 0;
        }
        else if (part.x === -1) {
            part.x = __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* BOARD_SIZE */] - 1;
        }
        if (part.y === __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* BOARD_SIZE */]) {
            part.y = 0;
        }
        else if (part.y === -1) {
            part.y = __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* BOARD_SIZE */] - 1;
        }
    };
    HomePage.prototype.addObstacles = function () {
        var x = this.randomNumber();
        var y = this.randomNumber();
        if (this.board[y][x] === true || y === 8) {
            return this.addObstacles();
        }
        this.obstacles.push({
            x: x,
            y: y
        });
    };
    HomePage.prototype.checkObstacles = function (x, y) {
        var res = false;
        this.obstacles.forEach(function (val) {
            if (val.x === x && val.y === y) {
                res = true;
            }
        });
        return res;
    };
    HomePage.prototype.obstacleCollision = function (part) {
        return this.checkObstacles(part.x, part.y);
    };
    HomePage.prototype.boardCollision = function (part) {
        return part.x === __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* BOARD_SIZE */] || part.x === -1 || part.y === __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* BOARD_SIZE */] || part.y === -1;
    };
    HomePage.prototype.selfCollision = function (part) {
        return this.board[part.y][part.x] === true;
    };
    HomePage.prototype.fruitCollision = function (part) {
        return part.x === this.fruit.x && part.y === this.fruit.y;
    };
    HomePage.prototype.resetFruit = function () {
        var x = this.randomNumber();
        var y = this.randomNumber();
        if (this.board[y][x] === true || this.checkObstacles(x, y)) {
            return this.resetFruit();
        }
        this.fruit = {
            x: x,
            y: y
        };
    };
    HomePage.prototype.eatFruit = function () {
        this.score++;
        var tail = Object.assign({}, this.snake.parts[this.snake.parts.length - 1]);
        this.snake.parts.push(tail);
        this.resetFruit();
        if (this.score % 5 === 0) {
            this.interval -= 15;
        }
    };
    HomePage.prototype.gameOver = function () {
        this.isGameOver = true;
        this.gameStarted = false;
        var me = this;
        if (this.score > this.best_score) {
            this.bestScoreService.store(this.score);
            this.best_score = this.score;
            this.newBestScore = true;
        }
        setTimeout(function () {
            me.isGameOver = false;
        }, 500);
        this.setBoard();
    };
    HomePage.prototype.randomNumber = function () {
        return Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* BOARD_SIZE */]);
    };
    HomePage.prototype.setBoard = function () {
        this.board = [];
        var devDim = localStorage.getItem('_dev_dim');
        var mDevDim = JSON.parse(devDim);
        var width;
        var height;
        if (mDevDim) {
            width = mDevDim[0]['w'];
            height = mDevDim[0]['h'];
        }
        width = Math.round(width / 10);
        height = Math.round(height / 10);
        for (var i = 0; i < width; i++) {
            this.board[i] = [];
            for (var j = 0; j < height; j++) {
                this.board[i][j] = false;
            }
        }
    };
    HomePage.prototype.showMenu = function () {
        this.showMenuChecker = !this.showMenuChecker;
    };
    HomePage.prototype.newGame = function (mode) {
        this.default_mode = mode || 'classic';
        this.showMenuChecker = false;
        this.newBestScore = false;
        this.gameStarted = true;
        this.score = 0;
        this.tempDirection = __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].LEFT;
        this.isGameOver = false;
        this.interval = 150;
        this.snake = {
            direction: __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* CONTROLS */].LEFT,
            parts: []
        };
        for (var i = 0; i < 3; i++) {
            this.snake.parts.push({ x: 8 + i, y: 8 });
        }
        if (mode === 'obstacles') {
            this.obstacles = [];
            var j = 1;
            do {
                this.addObstacles();
            } while (j++ < 9);
        }
        this.resetFruit();
        this.updatePositions();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\loure\OneDrive\CARTAO\Imagens\Documentos\PROJETOS\snakegame\snake\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Snaaaaaaaake\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <div class="game-container">\n    <div class="game-header">\n      <h3 class="logo">ColorWords</h3>\n      <div class="score-block">\n        <h3 class="score" [ngClass]="{\'new-best-score\': newBestScore}">Score: {{score}}</h3>\n        <h3 class="best-score" [ngClass]="{\'new-best-score\': newBestScore}">Best Score: {{best_score}}</h3>\n      </div>\n    </div>\n    <div class="row" *ngFor="let column of board; let i = index;">\n      <div class="column" [ngStyle]="{\'background-color\': setColors(i, j)}" *ngFor="let row of column; let j = index"></div>\n    </div>\n    <div class="start-button" [ngClass]="{\'disable-clicks\': gameStarted}" (click)="showMenu()">Start Game</div>\n    <div class="new-game-menu" *ngIf="showMenuChecker">\n      <span class="new-game-menu-label">Select Mode</span>\n      <div class="start-button new-game-button" (click)="newGame(mode)" *ngFor="let mode of getKeys(all_modes)">{{all_modes[mode]}}</div>\n    </div>\n  </div>\n</ion-content>\n\n\n'/*ion-inline-end:"C:\Users\loure\OneDrive\CARTAO\Imagens\Documentos\PROJETOS\snakegame\snake\src\pages\home\home.html"*/,
            host: {
                '(document:keydown)': 'handleKeyboardEvents($event)'
            }
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__providers_best_score_manager_best_score_manager__["a" /* BestScoreManagerProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_best_score_manager_best_score_manager__["a" /* BestScoreManagerProvider */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]) === "function" && _b || Object])
    ], HomePage);
    return HomePage;
    var _a, _b;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BestScoreManagerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
  Generated class for the BestScoreManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var BestScoreManagerProvider = /** @class */ (function () {
    function BestScoreManagerProvider() {
        this.ngxSnake = 'ngx_snake';
        console.log('Hello BestScoreManagerProvider Provider');
    }
    BestScoreManagerProvider.prototype.store = function (score) {
        localStorage.setItem(this.ngxSnake, JSON.stringify({ 'best_score': score }));
    };
    BestScoreManagerProvider.prototype.retrieve = function () {
        var storage = this.parse();
        if (!storage) {
            this.store(0);
            storage = this.parse();
        }
        return storage.best_score;
    };
    BestScoreManagerProvider.prototype.parse = function () {
        return JSON.parse(localStorage.getItem(this.ngxSnake));
    };
    BestScoreManagerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], BestScoreManagerProvider);
    return BestScoreManagerProvider;
}());

//# sourceMappingURL=best-score-manager.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(218);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_best_score_manager_best_score_manager__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__providers_best_score_manager_best_score_manager__["a" /* BestScoreManagerProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            console.log('Width: ' + platform.width());
            console.log('Height: ' + platform.height());
            var devDim = [];
            devDim.push({ w: platform.width(), h: platform.height() });
            localStorage.setItem('_dev_dim', JSON.stringify(devDim));
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\loure\OneDrive\CARTAO\Imagens\Documentos\PROJETOS\snakegame\snake\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\loure\OneDrive\CARTAO\Imagens\Documentos\PROJETOS\snakegame\snake\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BOARD_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CONTROLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GAME_MODES; });
var BOARD_SIZE = 18;
var CONTROLS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};
var COLORS = {
    GAME_OVER: '#D24D57',
    FRUIT: '#EC644B',
    HEAD: '#336E7B',
    BODY: '#C8F7C5',
    BOARD: '#86B5BD',
    OBSTACLE: '#383522'
};
var GAME_MODES = {
    classic: 'Classic',
    no_walls: 'No Walls',
    obstacles: 'Obstacles'
};
//# sourceMappingURL=constants.js.map

/***/ })

},[195]);
//# sourceMappingURL=main.js.map