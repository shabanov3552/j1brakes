(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function functions_getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function spollers() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                    spollerTitles.forEach((spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    }));
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", (function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    if (spollersBlock.classList.contains("_spoller-init")) {
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        spollerClose.classList.remove("_spoller-active");
                        _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                    }
                }));
            }));
        }
    }
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = functions_getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            }));
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
            }
            if (tabsContent.length) {
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    tabsTitles[index].setAttribute("data-tabs-title", "");
                    tabsContentItem.setAttribute("data-tabs-item", "");
                    if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                    tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                }));
            }
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                }));
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
            if (document.documentElement.classList.contains("menu-open") && !e.target.closest(".mobile-menu") && !e.target.closest(".icon-menu")) functions_menuClose();
        }));
    }
    function functions_menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    class Popup {
        constructor(options) {
            let config = {
                logging: true,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-popup-youtube",
                youtubePlaceAttribute: "data-popup-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    location: false,
                    goHash: false
                },
                on: {
                    beforeOpen: function() {},
                    afterOpen: function() {},
                    beforeClose: function() {},
                    afterClose: function() {}
                }
            };
            this.youTubeCode;
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }
        initPopups() {
            this.popupLogging(`Проснулся`);
            this.eventsPopup();
        }
        eventsPopup() {
            document.addEventListener("click", function(e) {
                const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                    this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                    if ("error" !== this._dataValue) {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                    return;
                }
                const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            }.bind(this));
            if (this.options.hashSettings.goHash) {
                window.addEventListener("hashchange", function() {
                    if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                }.bind(this));
                window.addEventListener("load", function() {
                    if (window.location.hash) this._openToHash();
                }.bind(this));
            }
        }
        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }
                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }
                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;
                this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                if (this.targetOpen.element) {
                    if (this.youTubeCode) {
                        const codeVideo = this.youTubeCode;
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute("allowfullscreen", "");
                        const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                        iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                        iframe.setAttribute("src", urlVideo);
                        if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                        }
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                    }
                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }
                    this.options.on.beforeOpen(this);
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.targetOpen.element.classList.add(this.options.classes.popupActive);
                    document.documentElement.classList.add(this.options.classes.bodyActive);
                    if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                    this.targetOpen.element.setAttribute("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;
                    setTimeout((() => {
                        this._focusTrap();
                    }), 50);
                    this.options.on.afterOpen(this);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.popupLogging(`Открыл попап`);
                } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
            }
        }
        close(selectorValue) {
            if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
            if (!this.isOpen || !bodyLockStatus) return;
            this.options.on.beforeClose(this);
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: this
                }
            }));
            if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
            this.previousOpen.element.classList.remove(this.options.classes.popupActive);
            this.previousOpen.element.setAttribute("aria-hidden", "true");
            if (!this._reopen) {
                document.documentElement.classList.remove(this.options.classes.bodyActive);
                !this.bodyLock ? bodyUnlock() : null;
                this.isOpen = false;
            }
            this._removeHash();
            if (this._selectorOpen) {
                this.lastClosed.selector = this.previousOpen.selector;
                this.lastClosed.element = this.previousOpen.element;
            }
            this.options.on.afterClose(this);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: this
                }
            }));
            setTimeout((() => {
                this._focusTrap();
            }), 50);
            this.popupLogging(`Закрыл попап`);
        }
        _getHash() {
            if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
        }
        _openToHash() {
            let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
            const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
            this.youTubeCode = buttons.getAttribute(this.options.youtubeAttribute) ? buttons.getAttribute(this.options.youtubeAttribute) : null;
            if (buttons && classInHash) this.open(classInHash);
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && 0 === focusedIndex) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        _focusTrap() {
            const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
            if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
        }
        popupLogging(message) {
            this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
        }
    }
    modules_flsModules.popup = new Popup({});
    function formFieldsInit(options = {
        viewPass: false,
        autoHeight: false
    }) {
        const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
        if (formFields.length) formFields.forEach((formField => {
            if (!formField.hasAttribute("data-placeholder-nohide")) formField.dataset.placeholder = formField.placeholder;
        }));
        document.body.addEventListener("input", (function(e) {
            const targetElement = e.target;
            if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.add("_form-focus");
                    targetElement.parentElement.classList.add("_form-focus");
                    if (targetElement.parentElement.querySelector(".form__clear-svg")) targetElement.parentElement.querySelector(".form__clear-svg").classList.add("_active");
                }
            }
        }));
        document.body.addEventListener("focusin", (function(e) {
            const targetElement = e.target;
            if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.add("_form-focus");
                    targetElement.parentElement.classList.add("_form-focus");
                    targetElement.addEventListener("input", (function(e) {
                        if (e.target.value.length > 0) if (targetElement.parentElement.querySelector(".form__clear-svg")) targetElement.parentElement.querySelector(".form__clear-svg").classList.add("_active");
                    }));
                }
                formValidate.removeError(targetElement);
                targetElement.hasAttribute("data-validate") ? formValidate.removeError(targetElement) : null;
            }
            if (targetElement.classList.contains("js_phone")) {
                targetElement.classList.add("_mask");
                Inputmask("+7(x99) 999 9999", {
                    clearIncomplete: true,
                    clearMaskOnLostFocus: true,
                    definitions: {
                        x: {
                            validator: "[0-79-9]"
                        }
                    },
                    onincomplete: function() {
                        targetElement.inputmask.remove();
                    }
                }).mask(targetElement);
            }
        }));
        document.body.addEventListener("focusout", (function(e) {
            const targetElement = e.target;
            if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                if (targetElement.dataset.placeholder) targetElement.placeholder = targetElement.dataset.placeholder;
                if (0 == targetElement.value.length) if (!targetElement.hasAttribute("data-no-focus-classes")) {
                    targetElement.classList.remove("_form-focus");
                    targetElement.parentElement.classList.remove("_form-focus");
                    if (targetElement.nextElementSibling) targetElement.nextElementSibling.classList.remove("_active");
                }
                if (targetElement.classList.contains("js_phone")) Inputmask.remove(targetElement);
                targetElement.hasAttribute("data-validate") ? formValidate.validateInput(targetElement) : null;
            }
        }));
        if (options.viewPass) document.addEventListener("click", (function(e) {
            let targetElement = e.target;
            if (targetElement.closest('[class*="__viewpass"]')) {
                let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                targetElement.classList.toggle("_viewpass-active");
            }
        }));
        if (options.autoHeight) {
            const textareas = document.querySelectorAll("textarea[data-autoheight]");
            if (textareas.length) {
                textareas.forEach((textarea => {
                    const startHeight = textarea.hasAttribute("data-autoheight-min") ? Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
                    const maxHeight = textarea.hasAttribute("data-autoheight-max") ? Number(textarea.dataset.autoheightMax) : 1 / 0;
                    setHeight(textarea, Math.min(startHeight, maxHeight));
                    textarea.addEventListener("input", (() => {
                        if (textarea.scrollHeight > startHeight) {
                            textarea.style.height = `auto`;
                            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
                        }
                    }));
                }));
                function setHeight(textarea, height) {
                    textarea.style.height = `${height}px`;
                }
            }
        }
    }
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if ("email" === formRequiredItem.dataset.required) {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    /*!
 * Bootstrap-select v1.13.14 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2020 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */
    (function(root, factory) {
        if (void 0 === root && void 0 !== window) root = window;
        if ("function" === typeof define && define.amd) define([ "jquery" ], (function(a0) {
            return factory(a0);
        })); else if ("object" === typeof module && module.exports) module.exports = factory(require("jquery")); else factory(root["jQuery"]);
    })(void 0, (function(jQuery) {
        (function($) {
            "use strict";
            var DISALLOWED_ATTRIBUTES = [ "sanitize", "whiteList", "sanitizeFn" ];
            var uriAttrs = [ "background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href" ];
            var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
            var DefaultWhitelist = {
                "*": [ "class", "dir", "id", "lang", "role", "tabindex", "style", ARIA_ATTRIBUTE_PATTERN ],
                a: [ "target", "href", "title", "rel" ],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: [ "src", "alt", "title", "width", "height" ],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            };
            var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
            var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
            function allowedAttribute(attr, allowedAttributeList) {
                var attrName = attr.nodeName.toLowerCase();
                if (-1 !== $.inArray(attrName, allowedAttributeList)) {
                    if (-1 !== $.inArray(attrName, uriAttrs)) return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
                    return true;
                }
                var regExp = $(allowedAttributeList).filter((function(index, value) {
                    return value instanceof RegExp;
                }));
                for (var i = 0, l = regExp.length; i < l; i++) if (attrName.match(regExp[i])) return true;
                return false;
            }
            function sanitizeHtml(unsafeElements, whiteList, sanitizeFn) {
                if (sanitizeFn && "function" === typeof sanitizeFn) return sanitizeFn(unsafeElements);
                var whitelistKeys = Object.keys(whiteList);
                for (var i = 0, len = unsafeElements.length; i < len; i++) {
                    var elements = unsafeElements[i].querySelectorAll("*");
                    for (var j = 0, len2 = elements.length; j < len2; j++) {
                        var el = elements[j];
                        var elName = el.nodeName.toLowerCase();
                        if (-1 === whitelistKeys.indexOf(elName)) {
                            el.parentNode.removeChild(el);
                            continue;
                        }
                        var attributeList = [].slice.call(el.attributes);
                        var whitelistedAttributes = [].concat(whiteList["*"] || [], whiteList[elName] || []);
                        for (var k = 0, len3 = attributeList.length; k < len3; k++) {
                            var attr = attributeList[k];
                            if (!allowedAttribute(attr, whitelistedAttributes)) el.removeAttribute(attr.nodeName);
                        }
                    }
                }
            }
            if (!("classList" in document.createElement("_"))) (function(view) {
                if (!("Element" in view)) return;
                var classListProp = "classList", protoProp = "prototype", elemCtrProto = view.Element[protoProp], objCtr = Object, classListGetter = function() {
                    var $elem = $(this);
                    return {
                        add: function(classes) {
                            classes = Array.prototype.slice.call(arguments).join(" ");
                            return $elem.addClass(classes);
                        },
                        remove: function(classes) {
                            classes = Array.prototype.slice.call(arguments).join(" ");
                            return $elem.removeClass(classes);
                        },
                        toggle: function(classes, force) {
                            return $elem.toggleClass(classes, force);
                        },
                        contains: function(classes) {
                            return $elem.hasClass(classes);
                        }
                    };
                };
                if (objCtr.defineProperty) {
                    var classListPropDesc = {
                        get: classListGetter,
                        enumerable: true,
                        configurable: true
                    };
                    try {
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    } catch (ex) {
                        if (void 0 === ex.number || -2146823252 === ex.number) {
                            classListPropDesc.enumerable = false;
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        }
                    }
                } else if (objCtr[protoProp].__defineGetter__) elemCtrProto.__defineGetter__(classListProp, classListGetter);
            })(window);
            var testElement = document.createElement("_");
            testElement.classList.add("c1", "c2");
            if (!testElement.classList.contains("c2")) {
                var _add = DOMTokenList.prototype.add, _remove = DOMTokenList.prototype.remove;
                DOMTokenList.prototype.add = function() {
                    Array.prototype.forEach.call(arguments, _add.bind(this));
                };
                DOMTokenList.prototype.remove = function() {
                    Array.prototype.forEach.call(arguments, _remove.bind(this));
                };
            }
            testElement.classList.toggle("c3", false);
            if (testElement.classList.contains("c3")) {
                var _toggle = DOMTokenList.prototype.toggle;
                DOMTokenList.prototype.toggle = function(token, force) {
                    if (1 in arguments && !this.contains(token) === !force) return force; else return _toggle.call(this, token);
                };
            }
            testElement = null;
            function isEqual(array1, array2) {
                return array1.length === array2.length && array1.every((function(element, index) {
                    return element === array2[index];
                }));
            }
            if (!String.prototype.startsWith) (function() {
                "use strict";
                var defineProperty = function() {
                    try {
                        var object = {};
                        var $defineProperty = Object.defineProperty;
                        var result = $defineProperty(object, object, object) && $defineProperty;
                    } catch (error) {}
                    return result;
                }();
                var toString = {}.toString;
                var startsWith = function(search) {
                    if (null == this) throw new TypeError;
                    var string = String(this);
                    if (search && "[object RegExp]" == toString.call(search)) throw new TypeError;
                    var stringLength = string.length;
                    var searchString = String(search);
                    var searchLength = searchString.length;
                    var position = arguments.length > 1 ? arguments[1] : void 0;
                    var pos = position ? Number(position) : 0;
                    if (pos != pos) pos = 0;
                    var start = Math.min(Math.max(pos, 0), stringLength);
                    if (searchLength + start > stringLength) return false;
                    var index = -1;
                    while (++index < searchLength) if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) return false;
                    return true;
                };
                if (defineProperty) defineProperty(String.prototype, "startsWith", {
                    value: startsWith,
                    configurable: true,
                    writable: true
                }); else String.prototype.startsWith = startsWith;
            })();
            if (!Object.keys) Object.keys = function(o, k, r) {
                r = [];
                for (k in o) r.hasOwnProperty.call(o, k) && r.push(k);
                return r;
            };
            if (HTMLSelectElement && !HTMLSelectElement.prototype.hasOwnProperty("selectedOptions")) Object.defineProperty(HTMLSelectElement.prototype, "selectedOptions", {
                get: function() {
                    return this.querySelectorAll(":checked");
                }
            });
            function getSelectedOptions(select, ignoreDisabled) {
                var opt, selectedOptions = select.selectedOptions, options = [];
                if (ignoreDisabled) {
                    for (var i = 0, len = selectedOptions.length; i < len; i++) {
                        opt = selectedOptions[i];
                        if (!(opt.disabled || "OPTGROUP" === opt.parentNode.tagName && opt.parentNode.disabled)) options.push(opt);
                    }
                    return options;
                }
                return selectedOptions;
            }
            function getSelectValues(select, selectedOptions) {
                var opt, value = [], options = selectedOptions || select.selectedOptions;
                for (var i = 0, len = options.length; i < len; i++) {
                    opt = options[i];
                    if (!(opt.disabled || "OPTGROUP" === opt.parentNode.tagName && opt.parentNode.disabled)) value.push(opt.value);
                }
                if (!select.multiple) return !value.length ? null : value[0];
                return value;
            }
            var valHooks = {
                useDefault: false,
                _set: $.valHooks.select.set
            };
            $.valHooks.select.set = function(elem, value) {
                if (value && !valHooks.useDefault) $(elem).data("selected", true);
                return valHooks._set.apply(this, arguments);
            };
            var changedArguments = null;
            var EventIsSupported = function() {
                try {
                    new Event("change");
                    return true;
                } catch (e) {
                    return false;
                }
            }();
            $.fn.triggerNative = function(eventName) {
                var event, el = this[0];
                if (el.dispatchEvent) {
                    if (EventIsSupported) event = new Event(eventName, {
                        bubbles: true
                    }); else {
                        event = document.createEvent("Event");
                        event.initEvent(eventName, true, false);
                    }
                    el.dispatchEvent(event);
                } else if (el.fireEvent) {
                    event = document.createEventObject();
                    event.eventType = eventName;
                    el.fireEvent("on" + eventName, event);
                } else this.trigger(eventName);
            };
            function stringSearch(li, searchString, method, normalize) {
                var stringTypes = [ "display", "subtext", "tokens" ], searchSuccess = false;
                for (var i = 0; i < stringTypes.length; i++) {
                    var stringType = stringTypes[i], string = li[stringType];
                    if (string) {
                        string = string.toString();
                        if ("display" === stringType) string = string.replace(/<[^>]+>/g, "");
                        if (normalize) string = normalizeToBase(string);
                        string = string.toUpperCase();
                        if ("contains" === method) searchSuccess = string.indexOf(searchString) >= 0; else searchSuccess = string.startsWith(searchString);
                        if (searchSuccess) break;
                    }
                }
                return searchSuccess;
            }
            function toInteger(value) {
                return parseInt(value, 10) || 0;
            }
            var deburredLetters = {
                À: "A",
                Á: "A",
                Â: "A",
                Ã: "A",
                Ä: "A",
                Å: "A",
                à: "a",
                á: "a",
                â: "a",
                ã: "a",
                ä: "a",
                å: "a",
                Ç: "C",
                ç: "c",
                Ð: "D",
                ð: "d",
                È: "E",
                É: "E",
                Ê: "E",
                Ë: "E",
                è: "e",
                é: "e",
                ê: "e",
                ë: "e",
                Ì: "I",
                Í: "I",
                Î: "I",
                Ï: "I",
                ì: "i",
                í: "i",
                î: "i",
                ï: "i",
                Ñ: "N",
                ñ: "n",
                Ò: "O",
                Ó: "O",
                Ô: "O",
                Õ: "O",
                Ö: "O",
                Ø: "O",
                ò: "o",
                ó: "o",
                ô: "o",
                õ: "o",
                ö: "o",
                ø: "o",
                Ù: "U",
                Ú: "U",
                Û: "U",
                Ü: "U",
                ù: "u",
                ú: "u",
                û: "u",
                ü: "u",
                Ý: "Y",
                ý: "y",
                ÿ: "y",
                Æ: "Ae",
                æ: "ae",
                Þ: "Th",
                þ: "th",
                ß: "ss",
                Ā: "A",
                Ă: "A",
                Ą: "A",
                ā: "a",
                ă: "a",
                ą: "a",
                Ć: "C",
                Ĉ: "C",
                Ċ: "C",
                Č: "C",
                ć: "c",
                ĉ: "c",
                ċ: "c",
                č: "c",
                Ď: "D",
                Đ: "D",
                ď: "d",
                đ: "d",
                Ē: "E",
                Ĕ: "E",
                Ė: "E",
                Ę: "E",
                Ě: "E",
                ē: "e",
                ĕ: "e",
                ė: "e",
                ę: "e",
                ě: "e",
                Ĝ: "G",
                Ğ: "G",
                Ġ: "G",
                Ģ: "G",
                ĝ: "g",
                ğ: "g",
                ġ: "g",
                ģ: "g",
                Ĥ: "H",
                Ħ: "H",
                ĥ: "h",
                ħ: "h",
                Ĩ: "I",
                Ī: "I",
                Ĭ: "I",
                Į: "I",
                İ: "I",
                ĩ: "i",
                ī: "i",
                ĭ: "i",
                į: "i",
                ı: "i",
                Ĵ: "J",
                ĵ: "j",
                Ķ: "K",
                ķ: "k",
                ĸ: "k",
                Ĺ: "L",
                Ļ: "L",
                Ľ: "L",
                Ŀ: "L",
                Ł: "L",
                ĺ: "l",
                ļ: "l",
                ľ: "l",
                ŀ: "l",
                ł: "l",
                Ń: "N",
                Ņ: "N",
                Ň: "N",
                Ŋ: "N",
                ń: "n",
                ņ: "n",
                ň: "n",
                ŋ: "n",
                Ō: "O",
                Ŏ: "O",
                Ő: "O",
                ō: "o",
                ŏ: "o",
                ő: "o",
                Ŕ: "R",
                Ŗ: "R",
                Ř: "R",
                ŕ: "r",
                ŗ: "r",
                ř: "r",
                Ś: "S",
                Ŝ: "S",
                Ş: "S",
                Š: "S",
                ś: "s",
                ŝ: "s",
                ş: "s",
                š: "s",
                Ţ: "T",
                Ť: "T",
                Ŧ: "T",
                ţ: "t",
                ť: "t",
                ŧ: "t",
                Ũ: "U",
                Ū: "U",
                Ŭ: "U",
                Ů: "U",
                Ű: "U",
                Ų: "U",
                ũ: "u",
                ū: "u",
                ŭ: "u",
                ů: "u",
                ű: "u",
                ų: "u",
                Ŵ: "W",
                ŵ: "w",
                Ŷ: "Y",
                ŷ: "y",
                Ÿ: "Y",
                Ź: "Z",
                Ż: "Z",
                Ž: "Z",
                ź: "z",
                ż: "z",
                ž: "z",
                Ĳ: "IJ",
                ĳ: "ij",
                Œ: "Oe",
                œ: "oe",
                ŉ: "'n",
                ſ: "s"
            };
            var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
            var rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboMarksExtendedRange = "\\u1ab0-\\u1aff", rsComboMarksSupplementRange = "\\u1dc0-\\u1dff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
            var rsCombo = "[" + rsComboRange + "]";
            var reComboMark = RegExp(rsCombo, "g");
            function deburrLetter(key) {
                return deburredLetters[key];
            }
            function normalizeToBase(string) {
                string = string.toString();
                return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
            }
            var escapeMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            };
            var createEscaper = function(map) {
                var escaper = function(match) {
                    return map[match];
                };
                var source = "(?:" + Object.keys(map).join("|") + ")";
                var testRegexp = RegExp(source);
                var replaceRegexp = RegExp(source, "g");
                return function(string) {
                    string = null == string ? "" : "" + string;
                    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
                };
            };
            var htmlEscape = createEscaper(escapeMap);
            var keyCodeMap = {
                32: " ",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "A",
                66: "B",
                67: "C",
                68: "D",
                69: "E",
                70: "F",
                71: "G",
                72: "H",
                73: "I",
                74: "J",
                75: "K",
                76: "L",
                77: "M",
                78: "N",
                79: "O",
                80: "P",
                81: "Q",
                82: "R",
                83: "S",
                84: "T",
                85: "U",
                86: "V",
                87: "W",
                88: "X",
                89: "Y",
                90: "Z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9"
            };
            var keyCodes = {
                ESCAPE: 27,
                ENTER: 13,
                SPACE: 32,
                TAB: 9,
                ARROW_UP: 38,
                ARROW_DOWN: 40
            };
            var version = {
                success: false,
                major: "3"
            };
            try {
                version.full = ($.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split(".");
                version.major = version.full[0];
                version.success = true;
            } catch (err) {}
            var selectId = 0;
            var EVENT_KEY = ".bs.select";
            var classNames = {
                DISABLED: "disabled",
                DIVIDER: "divider",
                SHOW: "open",
                DROPUP: "dropup",
                MENU: "dropdown-menu",
                MENURIGHT: "dropdown-menu-right",
                MENULEFT: "dropdown-menu-left",
                BUTTONCLASS: "btn-default",
                POPOVERHEADER: "popover-title",
                ICONBASE: "glyphicon",
                TICKICON: "glyphicon-ok"
            };
            var Selector = {
                MENU: "." + classNames.MENU
            };
            var elementTemplates = {
                span: document.createElement("span"),
                i: document.createElement("i"),
                subtext: document.createElement("small"),
                a: document.createElement("a"),
                li: document.createElement("li"),
                whitespace: document.createTextNode(" "),
                fragment: document.createDocumentFragment()
            };
            elementTemplates.a.setAttribute("role", "option");
            if ("4" === version.major) elementTemplates.a.className = "dropdown-item";
            elementTemplates.subtext.className = "text-muted";
            elementTemplates.text = elementTemplates.span.cloneNode(false);
            elementTemplates.text.className = "text";
            elementTemplates.checkMark = elementTemplates.span.cloneNode(false);
            var REGEXP_ARROW = new RegExp(keyCodes.ARROW_UP + "|" + keyCodes.ARROW_DOWN);
            var REGEXP_TAB_OR_ESCAPE = new RegExp("^" + keyCodes.TAB + "$|" + keyCodes.ESCAPE);
            var generateOption = {
                li: function(content, classes, optgroup) {
                    var li = elementTemplates.li.cloneNode(false);
                    if (content) if (1 === content.nodeType || 11 === content.nodeType) li.appendChild(content); else li.innerHTML = content;
                    if ("undefined" !== typeof classes && "" !== classes) li.className = classes;
                    if ("undefined" !== typeof optgroup && null !== optgroup) li.classList.add("optgroup-" + optgroup);
                    return li;
                },
                a: function(text, classes, inline) {
                    var a = elementTemplates.a.cloneNode(true);
                    if (text) if (11 === text.nodeType) a.appendChild(text); else a.insertAdjacentHTML("beforeend", text);
                    if ("undefined" !== typeof classes && "" !== classes) a.classList.add.apply(a.classList, classes.split(" "));
                    if (inline) a.setAttribute("style", inline);
                    return a;
                },
                text: function(options, useFragment) {
                    var subtextElement, iconElement, textElement = elementTemplates.text.cloneNode(false);
                    if (options.content) textElement.innerHTML = options.content; else {
                        textElement.textContent = options.text;
                        if (options.icon) {
                            var whitespace = elementTemplates.whitespace.cloneNode(false);
                            iconElement = (true === useFragment ? elementTemplates.i : elementTemplates.span).cloneNode(false);
                            iconElement.className = this.options.iconBase + " " + options.icon;
                            elementTemplates.fragment.appendChild(iconElement);
                            elementTemplates.fragment.appendChild(whitespace);
                        }
                        if (options.subtext) {
                            subtextElement = elementTemplates.subtext.cloneNode(false);
                            subtextElement.textContent = options.subtext;
                            textElement.appendChild(subtextElement);
                        }
                    }
                    if (true === useFragment) while (textElement.childNodes.length > 0) elementTemplates.fragment.appendChild(textElement.childNodes[0]); else elementTemplates.fragment.appendChild(textElement);
                    return elementTemplates.fragment;
                },
                label: function(options) {
                    var subtextElement, iconElement, textElement = elementTemplates.text.cloneNode(false);
                    textElement.innerHTML = options.display;
                    if (options.icon) {
                        var whitespace = elementTemplates.whitespace.cloneNode(false);
                        iconElement = elementTemplates.span.cloneNode(false);
                        iconElement.className = this.options.iconBase + " " + options.icon;
                        elementTemplates.fragment.appendChild(iconElement);
                        elementTemplates.fragment.appendChild(whitespace);
                    }
                    if (options.subtext) {
                        subtextElement = elementTemplates.subtext.cloneNode(false);
                        subtextElement.textContent = options.subtext;
                        textElement.appendChild(subtextElement);
                    }
                    elementTemplates.fragment.appendChild(textElement);
                    return elementTemplates.fragment;
                }
            };
            var Selectpicker = function(element, options) {
                var that = this;
                if (!valHooks.useDefault) {
                    $.valHooks.select.set = valHooks._set;
                    valHooks.useDefault = true;
                }
                this.$element = $(element);
                this.$newElement = null;
                this.$button = null;
                this.$menu = null;
                this.options = options;
                this.selectpicker = {
                    main: {},
                    search: {},
                    current: {},
                    view: {},
                    isSearching: false,
                    keydown: {
                        keyHistory: "",
                        resetKeyHistory: {
                            start: function() {
                                return setTimeout((function() {
                                    that.selectpicker.keydown.keyHistory = "";
                                }), 800);
                            }
                        }
                    }
                };
                this.sizeInfo = {};
                if (null === this.options.title) this.options.title = this.$element.attr("title");
                var winPad = this.options.windowPadding;
                if ("number" === typeof winPad) this.options.windowPadding = [ winPad, winPad, winPad, winPad ];
                this.val = Selectpicker.prototype.val;
                this.render = Selectpicker.prototype.render;
                this.refresh = Selectpicker.prototype.refresh;
                this.setStyle = Selectpicker.prototype.setStyle;
                this.selectAll = Selectpicker.prototype.selectAll;
                this.deselectAll = Selectpicker.prototype.deselectAll;
                this.destroy = Selectpicker.prototype.destroy;
                this.remove = Selectpicker.prototype.remove;
                this.show = Selectpicker.prototype.show;
                this.hide = Selectpicker.prototype.hide;
                this.init();
            };
            Selectpicker.VERSION = "1.13.14";
            Selectpicker.DEFAULTS = {
                noneSelectedText: "Nothing selected",
                noneResultsText: "No results matched {0}",
                countSelectedText: function(numSelected, numTotal) {
                    return 1 == numSelected ? "{0} item selected" : "{0} items selected";
                },
                maxOptionsText: function(numAll, numGroup) {
                    return [ 1 == numAll ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == numGroup ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)" ];
                },
                selectAllText: "Select All",
                deselectAllText: "Deselect All",
                doneButton: false,
                doneButtonText: "Close",
                multipleSeparator: ", ",
                styleBase: "btn",
                style: classNames.BUTTONCLASS,
                size: "auto",
                title: null,
                selectedTextFormat: "values",
                width: false,
                container: false,
                hideDisabled: false,
                showSubtext: false,
                showIcon: true,
                showContent: true,
                dropupAuto: true,
                header: false,
                liveSearch: false,
                liveSearchPlaceholder: null,
                liveSearchNormalize: false,
                liveSearchStyle: "contains",
                actionsBox: false,
                iconBase: classNames.ICONBASE,
                tickIcon: classNames.TICKICON,
                showTick: false,
                template: {
                    caret: '<span class="caret"></span>'
                },
                maxOptions: false,
                mobile: false,
                selectOnTab: false,
                dropdownAlignRight: false,
                windowPadding: 0,
                virtualScroll: 600,
                display: false,
                sanitize: true,
                sanitizeFn: null,
                whiteList: DefaultWhitelist
            };
            Selectpicker.prototype = {
                constructor: Selectpicker,
                init: function() {
                    var that = this, id = this.$element.attr("id");
                    selectId++;
                    this.selectId = "bs-select-" + selectId;
                    this.$element[0].classList.add("bs-select-hidden");
                    this.multiple = this.$element.prop("multiple");
                    this.autofocus = this.$element.prop("autofocus");
                    if (this.$element[0].classList.contains("show-tick")) this.options.showTick = true;
                    this.$newElement = this.createDropdown();
                    this.buildData();
                    this.$element.after(this.$newElement).prependTo(this.$newElement);
                    this.$button = this.$newElement.children("button");
                    this.$menu = this.$newElement.children(Selector.MENU);
                    this.$menuInner = this.$menu.children(".inner");
                    this.$searchbox = this.$menu.find("input");
                    this.$element[0].classList.remove("bs-select-hidden");
                    if (true === this.options.dropdownAlignRight) this.$menu[0].classList.add(classNames.MENURIGHT);
                    if ("undefined" !== typeof id) this.$button.attr("data-id", id);
                    this.checkDisabled();
                    this.clickListener();
                    if (this.options.liveSearch) {
                        this.liveSearchListener();
                        this.focusedParent = this.$searchbox[0];
                    } else this.focusedParent = this.$menuInner[0];
                    this.setStyle();
                    this.render();
                    this.setWidth();
                    if (this.options.container) this.selectPosition(); else this.$element.on("hide" + EVENT_KEY, (function() {
                        if (that.isVirtual()) {
                            var menuInner = that.$menuInner[0], emptyMenu = menuInner.firstChild.cloneNode(false);
                            menuInner.replaceChild(emptyMenu, menuInner.firstChild);
                            menuInner.scrollTop = 0;
                        }
                    }));
                    this.$menu.data("this", this);
                    this.$newElement.data("this", this);
                    if (this.options.mobile) this.mobile();
                    this.$newElement.on({
                        "hide.bs.dropdown": function(e) {
                            that.$element.trigger("hide" + EVENT_KEY, e);
                        },
                        "hidden.bs.dropdown": function(e) {
                            that.$element.trigger("hidden" + EVENT_KEY, e);
                        },
                        "show.bs.dropdown": function(e) {
                            that.$element.trigger("show" + EVENT_KEY, e);
                        },
                        "shown.bs.dropdown": function(e) {
                            that.$element.trigger("shown" + EVENT_KEY, e);
                        }
                    });
                    if (that.$element[0].hasAttribute("required")) this.$element.on("invalid" + EVENT_KEY, (function() {
                        that.$button[0].classList.add("bs-invalid");
                        that.$element.on("shown" + EVENT_KEY + ".invalid", (function() {
                            that.$element.val(that.$element.val()).off("shown" + EVENT_KEY + ".invalid");
                        })).on("rendered" + EVENT_KEY, (function() {
                            if (this.validity.valid) that.$button[0].classList.remove("bs-invalid");
                            that.$element.off("rendered" + EVENT_KEY);
                        }));
                        that.$button.on("blur" + EVENT_KEY, (function() {
                            that.$element.trigger("focus").trigger("blur");
                            that.$button.off("blur" + EVENT_KEY);
                        }));
                    }));
                    setTimeout((function() {
                        that.buildList();
                        that.$element.trigger("loaded" + EVENT_KEY);
                    }));
                },
                createDropdown: function() {
                    var showTick = this.multiple || this.options.showTick ? " show-tick" : "", multiselectable = this.multiple ? ' aria-multiselectable="true"' : "", inputGroup = "", autofocus = this.autofocus ? " autofocus" : "";
                    if (version.major < 4 && this.$element.parent().hasClass("input-group")) inputGroup = " input-group-btn";
                    var drop, header = "", searchbox = "", actionsbox = "", donebutton = "";
                    if (this.options.header) header = '<div class="' + classNames.POPOVERHEADER + '">' + '<button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>";
                    if (this.options.liveSearch) searchbox = '<div class="bs-searchbox">' + '<input type="search" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ' role="combobox" aria-label="Search" aria-controls="' + this.selectId + '" aria-autocomplete="list">' + "</div>";
                    if (this.multiple && this.options.actionsBox) actionsbox = '<div class="bs-actionsbox">' + '<div class="btn-group btn-group-sm btn-block">' + '<button type="button" class="actions-btn bs-select-all btn ' + classNames.BUTTONCLASS + '">' + this.options.selectAllText + "</button>" + '<button type="button" class="actions-btn bs-deselect-all btn ' + classNames.BUTTONCLASS + '">' + this.options.deselectAllText + "</button>" + "</div>" + "</div>";
                    if (this.multiple && this.options.doneButton) donebutton = '<div class="bs-donebutton">' + '<div class="btn-group btn-block">' + '<button type="button" class="btn btn-sm ' + classNames.BUTTONCLASS + '">' + this.options.doneButtonText + "</button>" + "</div>" + "</div>";
                    drop = '<div class="dropdown bootstrap-select' + showTick + inputGroup + '">' + '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" ' + ("static" === this.options.display ? 'data-display="static"' : "") + 'data-toggle="dropdown"' + autofocus + ' role="combobox" aria-owns="' + this.selectId + '" aria-haspopup="listbox" aria-expanded="false">' + '<div class="filter-option">' + '<div class="filter-option-inner">' + '<div class="filter-option-inner-inner"></div>' + "</div> " + "</div>" + ("4" === version.major ? "" : '<span class="bs-caret">' + this.options.template.caret + "</span>") + "</button>" + '<div class="' + classNames.MENU + " " + ("4" === version.major ? "" : classNames.SHOW) + '">' + header + searchbox + actionsbox + '<div class="inner ' + classNames.SHOW + '" role="listbox" id="' + this.selectId + '" tabindex="-1" ' + multiselectable + ">" + '<ul class="' + classNames.MENU + " inner " + ("4" === version.major ? classNames.SHOW : "") + '" role="presentation">' + "</ul>" + "</div>" + donebutton + "</div>" + "</div>";
                    return $(drop);
                },
                setPositionData: function() {
                    this.selectpicker.view.canHighlight = [];
                    this.selectpicker.view.size = 0;
                    for (var i = 0; i < this.selectpicker.current.data.length; i++) {
                        var li = this.selectpicker.current.data[i], canHighlight = true;
                        if ("divider" === li.type) {
                            canHighlight = false;
                            li.height = this.sizeInfo.dividerHeight;
                        } else if ("optgroup-label" === li.type) {
                            canHighlight = false;
                            li.height = this.sizeInfo.dropdownHeaderHeight;
                        } else li.height = this.sizeInfo.liHeight;
                        if (li.disabled) canHighlight = false;
                        this.selectpicker.view.canHighlight.push(canHighlight);
                        if (canHighlight) {
                            this.selectpicker.view.size++;
                            li.posinset = this.selectpicker.view.size;
                        }
                        li.position = (0 === i ? 0 : this.selectpicker.current.data[i - 1].position) + li.height;
                    }
                },
                isVirtual: function() {
                    return false !== this.options.virtualScroll && this.selectpicker.main.elements.length >= this.options.virtualScroll || true === this.options.virtualScroll;
                },
                createView: function(isSearching, setSize, refresh) {
                    var selected, prevActive, that = this, scrollTop = 0, active = [];
                    this.selectpicker.isSearching = isSearching;
                    this.selectpicker.current = isSearching ? this.selectpicker.search : this.selectpicker.main;
                    this.setPositionData();
                    if (setSize) if (refresh) scrollTop = this.$menuInner[0].scrollTop; else if (!that.multiple) {
                        var element = that.$element[0], selectedIndex = (element.options[element.selectedIndex] || {}).liIndex;
                        if ("number" === typeof selectedIndex && false !== that.options.size) {
                            var selectedData = that.selectpicker.main.data[selectedIndex], position = selectedData && selectedData.position;
                            if (position) scrollTop = position - (that.sizeInfo.menuInnerHeight + that.sizeInfo.liHeight) / 2;
                        }
                    }
                    scroll(scrollTop, true);
                    this.$menuInner.off("scroll.createView").on("scroll.createView", (function(e, updateValue) {
                        if (!that.noScroll) scroll(this.scrollTop, updateValue);
                        that.noScroll = false;
                    }));
                    function scroll(scrollTop, init) {
                        var chunkSize, chunkCount, firstChunk, lastChunk, currentChunk, prevPositions, positionIsDifferent, previousElements, size = that.selectpicker.current.elements.length, chunks = [], menuIsDifferent = true, isVirtual = that.isVirtual();
                        that.selectpicker.view.scrollTop = scrollTop;
                        chunkSize = Math.ceil(that.sizeInfo.menuInnerHeight / that.sizeInfo.liHeight * 1.5);
                        chunkCount = Math.round(size / chunkSize) || 1;
                        for (var i = 0; i < chunkCount; i++) {
                            var endOfChunk = (i + 1) * chunkSize;
                            if (i === chunkCount - 1) endOfChunk = size;
                            chunks[i] = [ i * chunkSize + (!i ? 0 : 1), endOfChunk ];
                            if (!size) break;
                            if (void 0 === currentChunk && scrollTop - 1 <= that.selectpicker.current.data[endOfChunk - 1].position - that.sizeInfo.menuInnerHeight) currentChunk = i;
                        }
                        if (void 0 === currentChunk) currentChunk = 0;
                        prevPositions = [ that.selectpicker.view.position0, that.selectpicker.view.position1 ];
                        firstChunk = Math.max(0, currentChunk - 1);
                        lastChunk = Math.min(chunkCount - 1, currentChunk + 1);
                        that.selectpicker.view.position0 = false === isVirtual ? 0 : Math.max(0, chunks[firstChunk][0]) || 0;
                        that.selectpicker.view.position1 = false === isVirtual ? size : Math.min(size, chunks[lastChunk][1]) || 0;
                        positionIsDifferent = prevPositions[0] !== that.selectpicker.view.position0 || prevPositions[1] !== that.selectpicker.view.position1;
                        if (void 0 !== that.activeIndex) {
                            prevActive = that.selectpicker.main.elements[that.prevActiveIndex];
                            active = that.selectpicker.main.elements[that.activeIndex];
                            selected = that.selectpicker.main.elements[that.selectedIndex];
                            if (init) {
                                if (that.activeIndex !== that.selectedIndex) that.defocusItem(active);
                                that.activeIndex = void 0;
                            }
                            if (that.activeIndex && that.activeIndex !== that.selectedIndex) that.defocusItem(selected);
                        }
                        if (void 0 !== that.prevActiveIndex && that.prevActiveIndex !== that.activeIndex && that.prevActiveIndex !== that.selectedIndex) that.defocusItem(prevActive);
                        if (init || positionIsDifferent) {
                            previousElements = that.selectpicker.view.visibleElements ? that.selectpicker.view.visibleElements.slice() : [];
                            if (false === isVirtual) that.selectpicker.view.visibleElements = that.selectpicker.current.elements; else that.selectpicker.view.visibleElements = that.selectpicker.current.elements.slice(that.selectpicker.view.position0, that.selectpicker.view.position1);
                            that.setOptionStatus();
                            if (isSearching || false === isVirtual && init) menuIsDifferent = !isEqual(previousElements, that.selectpicker.view.visibleElements);
                            if ((init || true === isVirtual) && menuIsDifferent) {
                                var marginTop, marginBottom, menuInner = that.$menuInner[0], menuFragment = document.createDocumentFragment(), emptyMenu = menuInner.firstChild.cloneNode(false), elements = that.selectpicker.view.visibleElements, toSanitize = [];
                                menuInner.replaceChild(emptyMenu, menuInner.firstChild);
                                i = 0;
                                for (var visibleElementsLen = elements.length; i < visibleElementsLen; i++) {
                                    var elText, elementData, element = elements[i];
                                    if (that.options.sanitize) {
                                        elText = element.lastChild;
                                        if (elText) {
                                            elementData = that.selectpicker.current.data[i + that.selectpicker.view.position0];
                                            if (elementData && elementData.content && !elementData.sanitized) {
                                                toSanitize.push(elText);
                                                elementData.sanitized = true;
                                            }
                                        }
                                    }
                                    menuFragment.appendChild(element);
                                }
                                if (that.options.sanitize && toSanitize.length) sanitizeHtml(toSanitize, that.options.whiteList, that.options.sanitizeFn);
                                if (true === isVirtual) {
                                    marginTop = 0 === that.selectpicker.view.position0 ? 0 : that.selectpicker.current.data[that.selectpicker.view.position0 - 1].position;
                                    marginBottom = that.selectpicker.view.position1 > size - 1 ? 0 : that.selectpicker.current.data[size - 1].position - that.selectpicker.current.data[that.selectpicker.view.position1 - 1].position;
                                    menuInner.firstChild.style.marginTop = marginTop + "px";
                                    menuInner.firstChild.style.marginBottom = marginBottom + "px";
                                } else {
                                    menuInner.firstChild.style.marginTop = 0;
                                    menuInner.firstChild.style.marginBottom = 0;
                                }
                                menuInner.firstChild.appendChild(menuFragment);
                                if (true === isVirtual && that.sizeInfo.hasScrollBar) {
                                    var menuInnerInnerWidth = menuInner.firstChild.offsetWidth;
                                    if (init && menuInnerInnerWidth < that.sizeInfo.menuInnerInnerWidth && that.sizeInfo.totalMenuWidth > that.sizeInfo.selectWidth) menuInner.firstChild.style.minWidth = that.sizeInfo.menuInnerInnerWidth + "px"; else if (menuInnerInnerWidth > that.sizeInfo.menuInnerInnerWidth) {
                                        that.$menu[0].style.minWidth = 0;
                                        var actualMenuWidth = menuInner.firstChild.offsetWidth;
                                        if (actualMenuWidth > that.sizeInfo.menuInnerInnerWidth) {
                                            that.sizeInfo.menuInnerInnerWidth = actualMenuWidth;
                                            menuInner.firstChild.style.minWidth = that.sizeInfo.menuInnerInnerWidth + "px";
                                        }
                                        that.$menu[0].style.minWidth = "";
                                    }
                                }
                            }
                        }
                        that.prevActiveIndex = that.activeIndex;
                        if (!that.options.liveSearch) that.$menuInner.trigger("focus"); else if (isSearching && init) {
                            var newActive, index = 0;
                            if (!that.selectpicker.view.canHighlight[index]) index = 1 + that.selectpicker.view.canHighlight.slice(1).indexOf(true);
                            newActive = that.selectpicker.view.visibleElements[index];
                            that.defocusItem(that.selectpicker.view.currentActive);
                            that.activeIndex = (that.selectpicker.current.data[index] || {}).index;
                            that.focusItem(newActive);
                        }
                    }
                    $(window).off("resize" + EVENT_KEY + "." + this.selectId + ".createView").on("resize" + EVENT_KEY + "." + this.selectId + ".createView", (function() {
                        var isActive = that.$newElement.hasClass(classNames.SHOW);
                        if (isActive) scroll(that.$menuInner[0].scrollTop);
                    }));
                },
                focusItem: function(li, liData, noStyle) {
                    if (li) {
                        liData = liData || this.selectpicker.main.data[this.activeIndex];
                        var a = li.firstChild;
                        if (a) {
                            a.setAttribute("aria-setsize", this.selectpicker.view.size);
                            a.setAttribute("aria-posinset", liData.posinset);
                            if (true !== noStyle) {
                                this.focusedParent.setAttribute("aria-activedescendant", a.id);
                                li.classList.add("active");
                                a.classList.add("active");
                            }
                        }
                    }
                },
                defocusItem: function(li) {
                    if (li) {
                        li.classList.remove("active");
                        if (li.firstChild) li.firstChild.classList.remove("active");
                    }
                },
                setPlaceholder: function() {
                    var updateIndex = false;
                    if (this.options.title && !this.multiple) {
                        if (!this.selectpicker.view.titleOption) this.selectpicker.view.titleOption = document.createElement("option");
                        updateIndex = true;
                        var element = this.$element[0], isSelected = false, titleNotAppended = !this.selectpicker.view.titleOption.parentNode;
                        if (titleNotAppended) {
                            this.selectpicker.view.titleOption.className = "bs-title-option";
                            this.selectpicker.view.titleOption.value = "";
                            var $opt = $(element.options[element.selectedIndex]);
                            isSelected = void 0 === $opt.attr("selected") && void 0 === this.$element.data("selected");
                        }
                        if (titleNotAppended || 0 !== this.selectpicker.view.titleOption.index) element.insertBefore(this.selectpicker.view.titleOption, element.firstChild);
                        if (isSelected) element.selectedIndex = 0;
                    }
                    return updateIndex;
                },
                buildData: function() {
                    var optionSelector = ':not([hidden]):not([data-hidden="true"])', mainData = [], optID = 0, startIndex = this.setPlaceholder() ? 1 : 0;
                    if (this.options.hideDisabled) optionSelector += ":not(:disabled)";
                    var selectOptions = this.$element[0].querySelectorAll("select > *" + optionSelector);
                    function addDivider(config) {
                        var previousData = mainData[mainData.length - 1];
                        if (previousData && "divider" === previousData.type && (previousData.optID || config.optID)) return;
                        config = config || {};
                        config.type = "divider";
                        mainData.push(config);
                    }
                    function addOption(option, config) {
                        config = config || {};
                        config.divider = "true" === option.getAttribute("data-divider");
                        if (config.divider) addDivider({
                            optID: config.optID
                        }); else {
                            var liIndex = mainData.length, cssText = option.style.cssText, inlineStyle = cssText ? htmlEscape(cssText) : "", optionClass = (option.className || "") + (config.optgroupClass || "");
                            if (config.optID) optionClass = "opt " + optionClass;
                            config.optionClass = optionClass.trim();
                            config.inlineStyle = inlineStyle;
                            config.text = option.textContent;
                            config.content = option.getAttribute("data-content");
                            config.tokens = option.getAttribute("data-tokens");
                            config.subtext = option.getAttribute("data-subtext");
                            config.icon = option.getAttribute("data-icon");
                            option.liIndex = liIndex;
                            config.display = config.content || config.text;
                            config.type = "option";
                            config.index = liIndex;
                            config.option = option;
                            config.selected = !!option.selected;
                            config.disabled = config.disabled || !!option.disabled;
                            mainData.push(config);
                        }
                    }
                    function addOptgroup(index, selectOptions) {
                        var optgroup = selectOptions[index], previous = selectOptions[index - 1], next = selectOptions[index + 1], options = optgroup.querySelectorAll("option" + optionSelector);
                        if (!options.length) return;
                        var headerIndex, lastIndex, config = {
                            display: htmlEscape(optgroup.label),
                            subtext: optgroup.getAttribute("data-subtext"),
                            icon: optgroup.getAttribute("data-icon"),
                            type: "optgroup-label",
                            optgroupClass: " " + (optgroup.className || "")
                        };
                        optID++;
                        if (previous) addDivider({
                            optID
                        });
                        config.optID = optID;
                        mainData.push(config);
                        for (var j = 0, len = options.length; j < len; j++) {
                            var option = options[j];
                            if (0 === j) {
                                headerIndex = mainData.length - 1;
                                lastIndex = headerIndex + len;
                            }
                            addOption(option, {
                                headerIndex,
                                lastIndex,
                                optID: config.optID,
                                optgroupClass: config.optgroupClass,
                                disabled: optgroup.disabled
                            });
                        }
                        if (next) addDivider({
                            optID
                        });
                    }
                    for (var len = selectOptions.length; startIndex < len; startIndex++) {
                        var item = selectOptions[startIndex];
                        if ("OPTGROUP" !== item.tagName) addOption(item, {}); else addOptgroup(startIndex, selectOptions);
                    }
                    this.selectpicker.main.data = this.selectpicker.current.data = mainData;
                },
                buildList: function() {
                    var that = this, selectData = this.selectpicker.main.data, mainElements = [], widestOptionLength = 0;
                    if ((that.options.showTick || that.multiple) && !elementTemplates.checkMark.parentNode) {
                        elementTemplates.checkMark.className = this.options.iconBase + " " + that.options.tickIcon + " check-mark";
                        elementTemplates.a.appendChild(elementTemplates.checkMark);
                    }
                    function buildElement(item) {
                        var liElement, combinedLength = 0;
                        switch (item.type) {
                          case "divider":
                            liElement = generateOption.li(false, classNames.DIVIDER, item.optID ? item.optID + "div" : void 0);
                            break;

                          case "option":
                            liElement = generateOption.li(generateOption.a(generateOption.text.call(that, item), item.optionClass, item.inlineStyle), "", item.optID);
                            if (liElement.firstChild) liElement.firstChild.id = that.selectId + "-" + item.index;
                            break;

                          case "optgroup-label":
                            liElement = generateOption.li(generateOption.label.call(that, item), "dropdown-header" + item.optgroupClass, item.optID);
                            break;
                        }
                        mainElements.push(liElement);
                        if (item.display) combinedLength += item.display.length;
                        if (item.subtext) combinedLength += item.subtext.length;
                        if (item.icon) combinedLength += 1;
                        if (combinedLength > widestOptionLength) {
                            widestOptionLength = combinedLength;
                            that.selectpicker.view.widestOption = mainElements[mainElements.length - 1];
                        }
                    }
                    for (var len = selectData.length, i = 0; i < len; i++) {
                        var item = selectData[i];
                        buildElement(item);
                    }
                    this.selectpicker.main.elements = this.selectpicker.current.elements = mainElements;
                },
                findLis: function() {
                    return this.$menuInner.find(".inner > li");
                },
                render: function() {
                    var showCount, countMax, that = this, element = this.$element[0], placeholderSelected = this.setPlaceholder() && 0 === element.selectedIndex, selectedOptions = getSelectedOptions(element, this.options.hideDisabled), selectedCount = selectedOptions.length, button = this.$button[0], buttonInner = button.querySelector(".filter-option-inner-inner"), multipleSeparator = document.createTextNode(this.options.multipleSeparator), titleFragment = elementTemplates.fragment.cloneNode(false), hasContent = false;
                    button.classList.toggle("bs-placeholder", that.multiple ? !selectedCount : !getSelectValues(element, selectedOptions));
                    this.tabIndex();
                    if ("static" === this.options.selectedTextFormat) titleFragment = generateOption.text.call(this, {
                        text: this.options.title
                    }, true); else {
                        showCount = this.multiple && -1 !== this.options.selectedTextFormat.indexOf("count") && selectedCount > 1;
                        if (showCount) {
                            countMax = this.options.selectedTextFormat.split(">");
                            showCount = countMax.length > 1 && selectedCount > countMax[1] || 1 === countMax.length && selectedCount >= 2;
                        }
                        if (false === showCount) {
                            if (!placeholderSelected) {
                                for (var selectedIndex = 0; selectedIndex < selectedCount; selectedIndex++) if (selectedIndex < 50) {
                                    var option = selectedOptions[selectedIndex], thisData = this.selectpicker.main.data[option.liIndex], titleOptions = {};
                                    if (this.multiple && selectedIndex > 0) titleFragment.appendChild(multipleSeparator.cloneNode(false));
                                    if (option.title) titleOptions.text = option.title; else if (thisData) if (thisData.content && that.options.showContent) {
                                        titleOptions.content = thisData.content.toString();
                                        hasContent = true;
                                    } else {
                                        if (that.options.showIcon) titleOptions.icon = thisData.icon;
                                        if (that.options.showSubtext && !that.multiple && thisData.subtext) titleOptions.subtext = " " + thisData.subtext;
                                        titleOptions.text = option.textContent.trim();
                                    }
                                    titleFragment.appendChild(generateOption.text.call(this, titleOptions, true));
                                } else break;
                                if (selectedCount > 49) titleFragment.appendChild(document.createTextNode("..."));
                            }
                        } else {
                            var optionSelector = ':not([hidden]):not([data-hidden="true"]):not([data-divider="true"])';
                            if (this.options.hideDisabled) optionSelector += ":not(:disabled)";
                            var totalCount = this.$element[0].querySelectorAll("select > option" + optionSelector + ", optgroup" + optionSelector + " option" + optionSelector).length, tr8nText = "function" === typeof this.options.countSelectedText ? this.options.countSelectedText(selectedCount, totalCount) : this.options.countSelectedText;
                            titleFragment = generateOption.text.call(this, {
                                text: tr8nText.replace("{0}", selectedCount.toString()).replace("{1}", totalCount.toString())
                            }, true);
                        }
                    }
                    if (void 0 == this.options.title) this.options.title = this.$element.attr("title");
                    if (!titleFragment.childNodes.length) titleFragment = generateOption.text.call(this, {
                        text: "undefined" !== typeof this.options.title ? this.options.title : this.options.noneSelectedText
                    }, true);
                    button.title = titleFragment.textContent.replace(/<[^>]*>?/g, "").trim();
                    if (this.options.sanitize && hasContent) sanitizeHtml([ titleFragment ], that.options.whiteList, that.options.sanitizeFn);
                    buttonInner.innerHTML = "";
                    buttonInner.appendChild(titleFragment);
                    if (version.major < 4 && this.$newElement[0].classList.contains("bs3-has-addon")) {
                        var filterExpand = button.querySelector(".filter-expand"), clone = buttonInner.cloneNode(true);
                        clone.className = "filter-expand";
                        if (filterExpand) button.replaceChild(clone, filterExpand); else button.appendChild(clone);
                    }
                    this.$element.trigger("rendered" + EVENT_KEY);
                },
                setStyle: function(newStyle, status) {
                    var buttonClass, button = this.$button[0], newElement = this.$newElement[0], style = this.options.style.trim();
                    if (this.$element.attr("class")) this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                    if (version.major < 4) {
                        newElement.classList.add("bs3");
                        if (newElement.parentNode.classList.contains("input-group") && (newElement.previousElementSibling || newElement.nextElementSibling) && (newElement.previousElementSibling || newElement.nextElementSibling).classList.contains("input-group-addon")) newElement.classList.add("bs3-has-addon");
                    }
                    if (newStyle) buttonClass = newStyle.trim(); else buttonClass = style;
                    if ("add" == status) {
                        if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(" "));
                    } else if ("remove" == status) {
                        if (buttonClass) button.classList.remove.apply(button.classList, buttonClass.split(" "));
                    } else {
                        if (style) button.classList.remove.apply(button.classList, style.split(" "));
                        if (buttonClass) button.classList.add.apply(button.classList, buttonClass.split(" "));
                    }
                },
                liHeight: function(refresh) {
                    if (!refresh && (false === this.options.size || Object.keys(this.sizeInfo).length)) return;
                    var newElement = document.createElement("div"), menu = document.createElement("div"), menuInner = document.createElement("div"), menuInnerInner = document.createElement("ul"), divider = document.createElement("li"), dropdownHeader = document.createElement("li"), li = document.createElement("li"), a = document.createElement("a"), text = document.createElement("span"), header = this.options.header && this.$menu.find("." + classNames.POPOVERHEADER).length > 0 ? this.$menu.find("." + classNames.POPOVERHEADER)[0].cloneNode(true) : null, search = this.options.liveSearch ? document.createElement("div") : null, actions = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(true) : null, doneButton = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(true) : null, firstOption = this.$element.find("option")[0];
                    this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth;
                    text.className = "text";
                    a.className = "dropdown-item " + (firstOption ? firstOption.className : "");
                    newElement.className = this.$menu[0].parentNode.className + " " + classNames.SHOW;
                    newElement.style.width = 0;
                    if ("auto" === this.options.width) menu.style.minWidth = 0;
                    menu.className = classNames.MENU + " " + classNames.SHOW;
                    menuInner.className = "inner " + classNames.SHOW;
                    menuInnerInner.className = classNames.MENU + " inner " + ("4" === version.major ? classNames.SHOW : "");
                    divider.className = classNames.DIVIDER;
                    dropdownHeader.className = "dropdown-header";
                    text.appendChild(document.createTextNode("​"));
                    a.appendChild(text);
                    li.appendChild(a);
                    dropdownHeader.appendChild(text.cloneNode(true));
                    if (this.selectpicker.view.widestOption) menuInnerInner.appendChild(this.selectpicker.view.widestOption.cloneNode(true));
                    menuInnerInner.appendChild(li);
                    menuInnerInner.appendChild(divider);
                    menuInnerInner.appendChild(dropdownHeader);
                    if (header) menu.appendChild(header);
                    if (search) {
                        var input = document.createElement("input");
                        search.className = "bs-searchbox";
                        input.className = "form-control";
                        search.appendChild(input);
                        menu.appendChild(search);
                    }
                    if (actions) menu.appendChild(actions);
                    menuInner.appendChild(menuInnerInner);
                    menu.appendChild(menuInner);
                    if (doneButton) menu.appendChild(doneButton);
                    newElement.appendChild(menu);
                    document.body.appendChild(newElement);
                    var scrollBarWidth, liHeight = li.offsetHeight, dropdownHeaderHeight = dropdownHeader ? dropdownHeader.offsetHeight : 0, headerHeight = header ? header.offsetHeight : 0, searchHeight = search ? search.offsetHeight : 0, actionsHeight = actions ? actions.offsetHeight : 0, doneButtonHeight = doneButton ? doneButton.offsetHeight : 0, dividerHeight = $(divider).outerHeight(true), menuStyle = window.getComputedStyle ? window.getComputedStyle(menu) : false, menuWidth = menu.offsetWidth, $menu = menuStyle ? null : $(menu), menuPadding = {
                        vert: toInteger(menuStyle ? menuStyle.paddingTop : $menu.css("paddingTop")) + toInteger(menuStyle ? menuStyle.paddingBottom : $menu.css("paddingBottom")) + toInteger(menuStyle ? menuStyle.borderTopWidth : $menu.css("borderTopWidth")) + toInteger(menuStyle ? menuStyle.borderBottomWidth : $menu.css("borderBottomWidth")),
                        horiz: toInteger(menuStyle ? menuStyle.paddingLeft : $menu.css("paddingLeft")) + toInteger(menuStyle ? menuStyle.paddingRight : $menu.css("paddingRight")) + toInteger(menuStyle ? menuStyle.borderLeftWidth : $menu.css("borderLeftWidth")) + toInteger(menuStyle ? menuStyle.borderRightWidth : $menu.css("borderRightWidth"))
                    }, menuExtras = {
                        vert: menuPadding.vert + toInteger(menuStyle ? menuStyle.marginTop : $menu.css("marginTop")) + toInteger(menuStyle ? menuStyle.marginBottom : $menu.css("marginBottom")) + 2,
                        horiz: menuPadding.horiz + toInteger(menuStyle ? menuStyle.marginLeft : $menu.css("marginLeft")) + toInteger(menuStyle ? menuStyle.marginRight : $menu.css("marginRight")) + 2
                    };
                    menuInner.style.overflowY = "scroll";
                    scrollBarWidth = menu.offsetWidth - menuWidth;
                    document.body.removeChild(newElement);
                    this.sizeInfo.liHeight = liHeight;
                    this.sizeInfo.dropdownHeaderHeight = dropdownHeaderHeight;
                    this.sizeInfo.headerHeight = headerHeight;
                    this.sizeInfo.searchHeight = searchHeight;
                    this.sizeInfo.actionsHeight = actionsHeight;
                    this.sizeInfo.doneButtonHeight = doneButtonHeight;
                    this.sizeInfo.dividerHeight = dividerHeight;
                    this.sizeInfo.menuPadding = menuPadding;
                    this.sizeInfo.menuExtras = menuExtras;
                    this.sizeInfo.menuWidth = menuWidth;
                    this.sizeInfo.menuInnerInnerWidth = menuWidth - menuPadding.horiz;
                    this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth;
                    this.sizeInfo.scrollBarWidth = scrollBarWidth;
                    this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight;
                    this.setPositionData();
                },
                getSelectPosition: function() {
                    var containerPos, that = this, $window = $(window), pos = that.$newElement.offset(), $container = $(that.options.container);
                    if (that.options.container && $container.length && !$container.is("body")) {
                        containerPos = $container.offset();
                        containerPos.top += parseInt($container.css("borderTopWidth"));
                        containerPos.left += parseInt($container.css("borderLeftWidth"));
                    } else containerPos = {
                        top: 0,
                        left: 0
                    };
                    var winPad = that.options.windowPadding;
                    this.sizeInfo.selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
                    this.sizeInfo.selectOffsetBot = $window.height() - this.sizeInfo.selectOffsetTop - this.sizeInfo.selectHeight - containerPos.top - winPad[2];
                    this.sizeInfo.selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
                    this.sizeInfo.selectOffsetRight = $window.width() - this.sizeInfo.selectOffsetLeft - this.sizeInfo.selectWidth - containerPos.left - winPad[1];
                    this.sizeInfo.selectOffsetTop -= winPad[0];
                    this.sizeInfo.selectOffsetLeft -= winPad[3];
                },
                setMenuSize: function(isAuto) {
                    this.getSelectPosition();
                    var menuInnerHeight, menuHeight, minHeight, _minHeight, maxHeight, menuInnerMinHeight, estimate, isDropup, selectWidth = this.sizeInfo.selectWidth, liHeight = this.sizeInfo.liHeight, headerHeight = this.sizeInfo.headerHeight, searchHeight = this.sizeInfo.searchHeight, actionsHeight = this.sizeInfo.actionsHeight, doneButtonHeight = this.sizeInfo.doneButtonHeight, divHeight = this.sizeInfo.dividerHeight, menuPadding = this.sizeInfo.menuPadding, divLength = 0;
                    if (this.options.dropupAuto) {
                        estimate = liHeight * this.selectpicker.current.elements.length + menuPadding.vert;
                        isDropup = this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert && estimate + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot;
                        if (true === this.selectpicker.isSearching) isDropup = this.selectpicker.dropup;
                        this.$newElement.toggleClass(classNames.DROPUP, isDropup);
                        this.selectpicker.dropup = isDropup;
                    }
                    if ("auto" === this.options.size) {
                        _minHeight = this.selectpicker.current.elements.length > 3 ? 3 * this.sizeInfo.liHeight + this.sizeInfo.menuExtras.vert - 2 : 0;
                        menuHeight = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert;
                        minHeight = _minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
                        menuInnerMinHeight = Math.max(_minHeight - menuPadding.vert, 0);
                        if (this.$newElement.hasClass(classNames.DROPUP)) menuHeight = this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert;
                        maxHeight = menuHeight;
                        menuInnerHeight = menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert;
                    } else if (this.options.size && "auto" != this.options.size && this.selectpicker.current.elements.length > this.options.size) {
                        for (var i = 0; i < this.options.size; i++) if ("divider" === this.selectpicker.current.data[i].type) divLength++;
                        menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;
                        menuInnerHeight = menuHeight - menuPadding.vert;
                        maxHeight = menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight;
                        minHeight = menuInnerMinHeight = "";
                    }
                    this.$menu.css({
                        "max-height": maxHeight + "px",
                        overflow: "hidden",
                        "min-height": minHeight + "px"
                    });
                    this.$menuInner.css({
                        "max-height": menuInnerHeight + "px",
                        "overflow-y": "auto",
                        "min-height": menuInnerMinHeight + "px"
                    });
                    this.sizeInfo.menuInnerHeight = Math.max(menuInnerHeight, 1);
                    if (this.selectpicker.current.data.length && this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position > this.sizeInfo.menuInnerHeight) {
                        this.sizeInfo.hasScrollBar = true;
                        this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth;
                    }
                    if ("auto" === this.options.dropdownAlignRight) this.$menu.toggleClass(classNames.MENURIGHT, this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight && this.sizeInfo.selectOffsetRight < this.sizeInfo.totalMenuWidth - selectWidth);
                    if (this.dropdown && this.dropdown._popper) this.dropdown._popper.update();
                },
                setSize: function(refresh) {
                    this.liHeight(refresh);
                    if (this.options.header) this.$menu.css("padding-top", 0);
                    if (false !== this.options.size) {
                        var that = this, $window = $(window);
                        this.setMenuSize();
                        if (this.options.liveSearch) this.$searchbox.off("input.setMenuSize propertychange.setMenuSize").on("input.setMenuSize propertychange.setMenuSize", (function() {
                            return that.setMenuSize();
                        }));
                        if ("auto" === this.options.size) $window.off("resize" + EVENT_KEY + "." + this.selectId + ".setMenuSize" + " scroll" + EVENT_KEY + "." + this.selectId + ".setMenuSize").on("resize" + EVENT_KEY + "." + this.selectId + ".setMenuSize" + " scroll" + EVENT_KEY + "." + this.selectId + ".setMenuSize", (function() {
                            return that.setMenuSize();
                        })); else if (this.options.size && "auto" != this.options.size && this.selectpicker.current.elements.length > this.options.size) $window.off("resize" + EVENT_KEY + "." + this.selectId + ".setMenuSize" + " scroll" + EVENT_KEY + "." + this.selectId + ".setMenuSize");
                    }
                    this.createView(false, true, refresh);
                },
                setWidth: function() {
                    var that = this;
                    if ("auto" === this.options.width) requestAnimationFrame((function() {
                        that.$menu.css("min-width", "0");
                        that.$element.on("loaded" + EVENT_KEY, (function() {
                            that.liHeight();
                            that.setMenuSize();
                            var $selectClone = that.$newElement.clone().appendTo("body"), btnWidth = $selectClone.css("width", "auto").children("button").outerWidth();
                            $selectClone.remove();
                            that.sizeInfo.selectWidth = Math.max(that.sizeInfo.totalMenuWidth, btnWidth);
                            that.$newElement.css("width", that.sizeInfo.selectWidth + "px");
                        }));
                    })); else if ("fit" === this.options.width) {
                        this.$menu.css("min-width", "");
                        this.$newElement.css("width", "").addClass("fit-width");
                    } else if (this.options.width) {
                        this.$menu.css("min-width", "");
                        this.$newElement.css("width", this.options.width);
                    } else {
                        this.$menu.css("min-width", "");
                        this.$newElement.css("width", "");
                    }
                    if (this.$newElement.hasClass("fit-width") && "fit" !== this.options.width) this.$newElement[0].classList.remove("fit-width");
                },
                selectPosition: function() {
                    this.$bsContainer = $('<div class="bs-container" />');
                    var pos, containerPos, actualHeight, that = this, $container = $(this.options.container), getPlacement = function($element) {
                        var containerPosition = {}, display = that.options.display || ($.fn.dropdown.Constructor.Default ? $.fn.dropdown.Constructor.Default.display : false);
                        that.$bsContainer.addClass($element.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass(classNames.DROPUP, $element.hasClass(classNames.DROPUP));
                        pos = $element.offset();
                        if (!$container.is("body")) {
                            containerPos = $container.offset();
                            containerPos.top += parseInt($container.css("borderTopWidth")) - $container.scrollTop();
                            containerPos.left += parseInt($container.css("borderLeftWidth")) - $container.scrollLeft();
                        } else containerPos = {
                            top: 0,
                            left: 0
                        };
                        actualHeight = $element.hasClass(classNames.DROPUP) ? 0 : $element[0].offsetHeight;
                        if (version.major < 4 || "static" === display) {
                            containerPosition.top = pos.top - containerPos.top + actualHeight;
                            containerPosition.left = pos.left - containerPos.left;
                        }
                        containerPosition.width = $element[0].offsetWidth;
                        that.$bsContainer.css(containerPosition);
                    };
                    this.$button.on("click.bs.dropdown.data-api", (function() {
                        if (that.isDisabled()) return;
                        getPlacement(that.$newElement);
                        that.$bsContainer.appendTo(that.options.container).toggleClass(classNames.SHOW, !that.$button.hasClass(classNames.SHOW)).append(that.$menu);
                    }));
                    $(window).off("resize" + EVENT_KEY + "." + this.selectId + " scroll" + EVENT_KEY + "." + this.selectId).on("resize" + EVENT_KEY + "." + this.selectId + " scroll" + EVENT_KEY + "." + this.selectId, (function() {
                        var isActive = that.$newElement.hasClass(classNames.SHOW);
                        if (isActive) getPlacement(that.$newElement);
                    }));
                    this.$element.on("hide" + EVENT_KEY, (function() {
                        that.$menu.data("height", that.$menu.height());
                        that.$bsContainer.detach();
                    }));
                },
                setOptionStatus: function(selectedOnly) {
                    var that = this;
                    that.noScroll = false;
                    if (that.selectpicker.view.visibleElements && that.selectpicker.view.visibleElements.length) for (var i = 0; i < that.selectpicker.view.visibleElements.length; i++) {
                        var liData = that.selectpicker.current.data[i + that.selectpicker.view.position0], option = liData.option;
                        if (option) {
                            if (true !== selectedOnly) that.setDisabled(liData.index, liData.disabled);
                            that.setSelected(liData.index, option.selected);
                        }
                    }
                },
                setSelected: function(index, selected) {
                    var prevActive, a, li = this.selectpicker.main.elements[index], liData = this.selectpicker.main.data[index], activeIndexIsSet = void 0 !== this.activeIndex, thisIsActive = this.activeIndex === index, keepActive = thisIsActive || selected && !this.multiple && !activeIndexIsSet;
                    liData.selected = selected;
                    a = li.firstChild;
                    if (selected) this.selectedIndex = index;
                    li.classList.toggle("selected", selected);
                    if (keepActive) {
                        this.focusItem(li, liData);
                        this.selectpicker.view.currentActive = li;
                        this.activeIndex = index;
                    } else this.defocusItem(li);
                    if (a) {
                        a.classList.toggle("selected", selected);
                        if (selected) a.setAttribute("aria-selected", true); else if (this.multiple) a.setAttribute("aria-selected", false); else a.removeAttribute("aria-selected");
                    }
                    if (!keepActive && !activeIndexIsSet && selected && void 0 !== this.prevActiveIndex) {
                        prevActive = this.selectpicker.main.elements[this.prevActiveIndex];
                        this.defocusItem(prevActive);
                    }
                },
                setDisabled: function(index, disabled) {
                    var a, li = this.selectpicker.main.elements[index];
                    this.selectpicker.main.data[index].disabled = disabled;
                    a = li.firstChild;
                    li.classList.toggle(classNames.DISABLED, disabled);
                    if (a) {
                        if ("4" === version.major) a.classList.toggle(classNames.DISABLED, disabled);
                        if (disabled) {
                            a.setAttribute("aria-disabled", disabled);
                            a.setAttribute("tabindex", -1);
                        } else {
                            a.removeAttribute("aria-disabled");
                            a.setAttribute("tabindex", 0);
                        }
                    }
                },
                isDisabled: function() {
                    return this.$element[0].disabled;
                },
                checkDisabled: function() {
                    if (this.isDisabled()) {
                        this.$newElement[0].classList.add(classNames.DISABLED);
                        this.$button.addClass(classNames.DISABLED).attr("tabindex", -1).attr("aria-disabled", true);
                    } else {
                        if (this.$button[0].classList.contains(classNames.DISABLED)) {
                            this.$newElement[0].classList.remove(classNames.DISABLED);
                            this.$button.removeClass(classNames.DISABLED).attr("aria-disabled", false);
                        }
                        if (-1 == this.$button.attr("tabindex") && !this.$element.data("tabindex")) this.$button.removeAttr("tabindex");
                    }
                },
                tabIndex: function() {
                    if (this.$element.data("tabindex") !== this.$element.attr("tabindex") && -98 !== this.$element.attr("tabindex") && "-98" !== this.$element.attr("tabindex")) {
                        this.$element.data("tabindex", this.$element.attr("tabindex"));
                        this.$button.attr("tabindex", this.$element.data("tabindex"));
                    }
                    this.$element.attr("tabindex", -98);
                },
                clickListener: function() {
                    var that = this, $document = $(document);
                    $document.data("spaceSelect", false);
                    this.$button.on("keyup", (function(e) {
                        if (/(32)/.test(e.keyCode.toString(10)) && $document.data("spaceSelect")) {
                            e.preventDefault();
                            $document.data("spaceSelect", false);
                        }
                    }));
                    this.$newElement.on("show.bs.dropdown", (function() {
                        if (version.major > 3 && !that.dropdown) {
                            that.dropdown = that.$button.data("bs.dropdown");
                            that.dropdown._menu = that.$menu[0];
                        }
                    }));
                    this.$button.on("click.bs.dropdown.data-api", (function() {
                        if (!that.$newElement.hasClass(classNames.SHOW)) that.setSize();
                    }));
                    function setFocus() {
                        if (that.options.liveSearch) that.$searchbox.trigger("focus"); else that.$menuInner.trigger("focus");
                    }
                    function checkPopperExists() {
                        if (that.dropdown && that.dropdown._popper && that.dropdown._popper.state.isCreated) setFocus(); else requestAnimationFrame(checkPopperExists);
                    }
                    this.$element.on("shown" + EVENT_KEY, (function() {
                        if (that.$menuInner[0].scrollTop !== that.selectpicker.view.scrollTop) that.$menuInner[0].scrollTop = that.selectpicker.view.scrollTop;
                        if (version.major > 3) requestAnimationFrame(checkPopperExists); else setFocus();
                    }));
                    this.$menuInner.on("mouseenter", "li a", (function(e) {
                        var hoverLi = this.parentElement, position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0, index = Array.prototype.indexOf.call(hoverLi.parentElement.children, hoverLi), hoverData = that.selectpicker.current.data[index + position0];
                        that.focusItem(hoverLi, hoverData, true);
                    }));
                    this.$menuInner.on("click", "li a", (function(e, retainActive) {
                        var $this = $(this), element = that.$element[0], position0 = that.isVirtual() ? that.selectpicker.view.position0 : 0, clickedData = that.selectpicker.current.data[$this.parent().index() + position0], clickedIndex = clickedData.index, prevValue = getSelectValues(element), prevIndex = element.selectedIndex, prevOption = element.options[prevIndex], triggerChange = true;
                        if (that.multiple && 1 !== that.options.maxOptions) e.stopPropagation();
                        e.preventDefault();
                        if (!that.isDisabled() && !$this.parent().hasClass(classNames.DISABLED)) {
                            var option = clickedData.option, $option = $(option), state = option.selected, $optgroup = $option.parent("optgroup"), $optgroupOptions = $optgroup.find("option"), maxOptions = that.options.maxOptions, maxOptionsGrp = $optgroup.data("maxOptions") || false;
                            if (clickedIndex === that.activeIndex) retainActive = true;
                            if (!retainActive) {
                                that.prevActiveIndex = that.activeIndex;
                                that.activeIndex = void 0;
                            }
                            if (!that.multiple) {
                                if (prevOption) prevOption.selected = false;
                                option.selected = true;
                                that.setSelected(clickedIndex, true);
                            } else {
                                option.selected = !state;
                                that.setSelected(clickedIndex, !state);
                                $this.trigger("blur");
                                if (false !== maxOptions || false !== maxOptionsGrp) {
                                    var maxReached = maxOptions < getSelectedOptions(element).length, maxReachedGrp = maxOptionsGrp < $optgroup.find("option:selected").length;
                                    if (maxOptions && maxReached || maxOptionsGrp && maxReachedGrp) if (maxOptions && 1 == maxOptions) {
                                        element.selectedIndex = -1;
                                        option.selected = true;
                                        that.setOptionStatus(true);
                                    } else if (maxOptionsGrp && 1 == maxOptionsGrp) {
                                        for (var i = 0; i < $optgroupOptions.length; i++) {
                                            var _option = $optgroupOptions[i];
                                            _option.selected = false;
                                            that.setSelected(_option.liIndex, false);
                                        }
                                        option.selected = true;
                                        that.setSelected(clickedIndex, true);
                                    } else {
                                        var maxOptionsText = "string" === typeof that.options.maxOptionsText ? [ that.options.maxOptionsText, that.options.maxOptionsText ] : that.options.maxOptionsText, maxOptionsArr = "function" === typeof maxOptionsText ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText, maxTxt = maxOptionsArr[0].replace("{n}", maxOptions), maxTxtGrp = maxOptionsArr[1].replace("{n}", maxOptionsGrp), $notify = $('<div class="notify"></div>');
                                        if (maxOptionsArr[2]) {
                                            maxTxt = maxTxt.replace("{var}", maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                                            maxTxtGrp = maxTxtGrp.replace("{var}", maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                                        }
                                        option.selected = false;
                                        that.$menu.append($notify);
                                        if (maxOptions && maxReached) {
                                            $notify.append($("<div>" + maxTxt + "</div>"));
                                            triggerChange = false;
                                            that.$element.trigger("maxReached" + EVENT_KEY);
                                        }
                                        if (maxOptionsGrp && maxReachedGrp) {
                                            $notify.append($("<div>" + maxTxtGrp + "</div>"));
                                            triggerChange = false;
                                            that.$element.trigger("maxReachedGrp" + EVENT_KEY);
                                        }
                                        setTimeout((function() {
                                            that.setSelected(clickedIndex, false);
                                        }), 10);
                                        $notify[0].classList.add("fadeOut");
                                        setTimeout((function() {
                                            $notify.remove();
                                        }), 1050);
                                    }
                                }
                            }
                            if (!that.multiple || that.multiple && 1 === that.options.maxOptions) that.$button.trigger("focus"); else if (that.options.liveSearch) that.$searchbox.trigger("focus");
                            if (triggerChange) if (that.multiple || prevIndex !== element.selectedIndex) {
                                changedArguments = [ option.index, $option.prop("selected"), prevValue ];
                                that.$element.triggerNative("change");
                            }
                        }
                    }));
                    this.$menu.on("click", "li." + classNames.DISABLED + " a, ." + classNames.POPOVERHEADER + ", ." + classNames.POPOVERHEADER + " :not(.close)", (function(e) {
                        if (e.currentTarget == this) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (that.options.liveSearch && !$(e.target).hasClass("close")) that.$searchbox.trigger("focus"); else that.$button.trigger("focus");
                        }
                    }));
                    this.$menuInner.on("click", ".divider, .dropdown-header", (function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (that.options.liveSearch) that.$searchbox.trigger("focus"); else that.$button.trigger("focus");
                    }));
                    this.$menu.on("click", "." + classNames.POPOVERHEADER + " .close", (function() {
                        that.$button.trigger("click");
                    }));
                    this.$searchbox.on("click", (function(e) {
                        e.stopPropagation();
                    }));
                    this.$menu.on("click", ".actions-btn", (function(e) {
                        if (that.options.liveSearch) that.$searchbox.trigger("focus"); else that.$button.trigger("focus");
                        e.preventDefault();
                        e.stopPropagation();
                        if ($(this).hasClass("bs-select-all")) that.selectAll(); else that.deselectAll();
                    }));
                    this.$element.on("change" + EVENT_KEY, (function() {
                        that.render();
                        that.$element.trigger("changed" + EVENT_KEY, changedArguments);
                        changedArguments = null;
                    })).on("focus" + EVENT_KEY, (function() {
                        if (!that.options.mobile) that.$button.trigger("focus");
                    }));
                },
                liveSearchListener: function() {
                    var that = this, noResults = document.createElement("li");
                    this.$button.on("click.bs.dropdown.data-api", (function() {
                        if (!!that.$searchbox.val()) that.$searchbox.val("");
                    }));
                    this.$searchbox.on("click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api", (function(e) {
                        e.stopPropagation();
                    }));
                    this.$searchbox.on("input propertychange", (function() {
                        var searchValue = that.$searchbox.val();
                        that.selectpicker.search.elements = [];
                        that.selectpicker.search.data = [];
                        if (searchValue) {
                            var searchMatch = [], q = searchValue.toUpperCase(), cache = {}, cacheArr = [], searchStyle = that._searchStyle(), normalizeSearch = that.options.liveSearchNormalize;
                            if (normalizeSearch) q = normalizeToBase(q);
                            for (var i = 0; i < that.selectpicker.main.data.length; i++) {
                                var li = that.selectpicker.main.data[i];
                                if (!cache[i]) cache[i] = stringSearch(li, q, searchStyle, normalizeSearch);
                                if (cache[i] && void 0 !== li.headerIndex && -1 === cacheArr.indexOf(li.headerIndex)) {
                                    if (li.headerIndex > 0) {
                                        cache[li.headerIndex - 1] = true;
                                        cacheArr.push(li.headerIndex - 1);
                                    }
                                    cache[li.headerIndex] = true;
                                    cacheArr.push(li.headerIndex);
                                    cache[li.lastIndex + 1] = true;
                                }
                                if (cache[i] && "optgroup-label" !== li.type) cacheArr.push(i);
                            }
                            i = 0;
                            for (var cacheLen = cacheArr.length; i < cacheLen; i++) {
                                var index = cacheArr[i], prevIndex = cacheArr[i - 1], liPrev = (li = that.selectpicker.main.data[index], 
                                that.selectpicker.main.data[prevIndex]);
                                if ("divider" !== li.type || "divider" === li.type && liPrev && "divider" !== liPrev.type && cacheLen - 1 !== i) {
                                    that.selectpicker.search.data.push(li);
                                    searchMatch.push(that.selectpicker.main.elements[index]);
                                }
                            }
                            that.activeIndex = void 0;
                            that.noScroll = true;
                            that.$menuInner.scrollTop(0);
                            that.selectpicker.search.elements = searchMatch;
                            that.createView(true);
                            if (!searchMatch.length) {
                                noResults.className = "no-results";
                                noResults.innerHTML = that.options.noneResultsText.replace("{0}", '"' + htmlEscape(searchValue) + '"');
                                that.$menuInner[0].firstChild.appendChild(noResults);
                            }
                        } else {
                            that.$menuInner.scrollTop(0);
                            that.createView(false);
                        }
                    }));
                },
                _searchStyle: function() {
                    return this.options.liveSearchStyle || "contains";
                },
                val: function(value) {
                    var element = this.$element[0];
                    if ("undefined" !== typeof value) {
                        var prevValue = getSelectValues(element);
                        changedArguments = [ null, null, prevValue ];
                        this.$element.val(value).trigger("changed" + EVENT_KEY, changedArguments);
                        if (this.$newElement.hasClass(classNames.SHOW)) if (this.multiple) this.setOptionStatus(true); else {
                            var liSelectedIndex = (element.options[element.selectedIndex] || {}).liIndex;
                            if ("number" === typeof liSelectedIndex) {
                                this.setSelected(this.selectedIndex, false);
                                this.setSelected(liSelectedIndex, true);
                            }
                        }
                        this.render();
                        changedArguments = null;
                        return this.$element;
                    } else return this.$element.val();
                },
                changeAll: function(status) {
                    if (!this.multiple) return;
                    if ("undefined" === typeof status) status = true;
                    var element = this.$element[0], previousSelected = 0, currentSelected = 0, prevValue = getSelectValues(element);
                    element.classList.add("bs-select-hidden");
                    for (var i = 0, data = this.selectpicker.current.data, len = data.length; i < len; i++) {
                        var liData = data[i], option = liData.option;
                        if (option && !liData.disabled && "divider" !== liData.type) {
                            if (liData.selected) previousSelected++;
                            option.selected = status;
                            if (true === status) currentSelected++;
                        }
                    }
                    element.classList.remove("bs-select-hidden");
                    if (previousSelected === currentSelected) return;
                    this.setOptionStatus();
                    changedArguments = [ null, null, prevValue ];
                    this.$element.triggerNative("change");
                },
                selectAll: function() {
                    return this.changeAll(true);
                },
                deselectAll: function() {
                    return this.changeAll(false);
                },
                toggle: function(e) {
                    e = e || window.event;
                    if (e) e.stopPropagation();
                    this.$button.trigger("click.bs.dropdown.data-api");
                },
                keydown: function(e) {
                    var index, isActive, liActive, activeLi, offset, $this = $(this), isToggle = $this.hasClass("dropdown-toggle"), $parent = isToggle ? $this.closest(".dropdown") : $this.closest(Selector.MENU), that = $parent.data("this"), $items = that.findLis(), updateScroll = false, downOnTab = e.which === keyCodes.TAB && !isToggle && !that.options.selectOnTab, isArrowKey = REGEXP_ARROW.test(e.which) || downOnTab, scrollTop = that.$menuInner[0].scrollTop, isVirtual = that.isVirtual(), position0 = true === isVirtual ? that.selectpicker.view.position0 : 0;
                    if (e.which >= 112 && e.which <= 123) return;
                    isActive = that.$newElement.hasClass(classNames.SHOW);
                    if (!isActive && (isArrowKey || e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 105 || e.which >= 65 && e.which <= 90)) {
                        that.$button.trigger("click.bs.dropdown.data-api");
                        if (that.options.liveSearch) {
                            that.$searchbox.trigger("focus");
                            return;
                        }
                    }
                    if (e.which === keyCodes.ESCAPE && isActive) {
                        e.preventDefault();
                        that.$button.trigger("click.bs.dropdown.data-api").trigger("focus");
                    }
                    if (isArrowKey) {
                        if (!$items.length) return;
                        liActive = that.selectpicker.main.elements[that.activeIndex];
                        index = liActive ? Array.prototype.indexOf.call(liActive.parentElement.children, liActive) : -1;
                        if (-1 !== index) that.defocusItem(liActive);
                        if (e.which === keyCodes.ARROW_UP) {
                            if (-1 !== index) index--;
                            if (index + position0 < 0) index += $items.length;
                            if (!that.selectpicker.view.canHighlight[index + position0]) {
                                index = that.selectpicker.view.canHighlight.slice(0, index + position0).lastIndexOf(true) - position0;
                                if (-1 === index) index = $items.length - 1;
                            }
                        } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) {
                            index++;
                            if (index + position0 >= that.selectpicker.view.canHighlight.length) index = 0;
                            if (!that.selectpicker.view.canHighlight[index + position0]) index = index + 1 + that.selectpicker.view.canHighlight.slice(index + position0 + 1).indexOf(true);
                        }
                        e.preventDefault();
                        var liActiveIndex = position0 + index;
                        if (e.which === keyCodes.ARROW_UP) if (0 === position0 && index === $items.length - 1) {
                            that.$menuInner[0].scrollTop = that.$menuInner[0].scrollHeight;
                            liActiveIndex = that.selectpicker.current.elements.length - 1;
                        } else {
                            activeLi = that.selectpicker.current.data[liActiveIndex];
                            offset = activeLi.position - activeLi.height;
                            updateScroll = offset < scrollTop;
                        } else if (e.which === keyCodes.ARROW_DOWN || downOnTab) if (0 === index) {
                            that.$menuInner[0].scrollTop = 0;
                            liActiveIndex = 0;
                        } else {
                            activeLi = that.selectpicker.current.data[liActiveIndex];
                            offset = activeLi.position - that.sizeInfo.menuInnerHeight;
                            updateScroll = offset > scrollTop;
                        }
                        liActive = that.selectpicker.current.elements[liActiveIndex];
                        that.activeIndex = that.selectpicker.current.data[liActiveIndex].index;
                        that.focusItem(liActive);
                        that.selectpicker.view.currentActive = liActive;
                        if (updateScroll) that.$menuInner[0].scrollTop = offset;
                        if (that.options.liveSearch) that.$searchbox.trigger("focus"); else $this.trigger("focus");
                    } else if (!$this.is("input") && !REGEXP_TAB_OR_ESCAPE.test(e.which) || e.which === keyCodes.SPACE && that.selectpicker.keydown.keyHistory) {
                        var searchMatch, keyHistory, matches = [];
                        e.preventDefault();
                        that.selectpicker.keydown.keyHistory += keyCodeMap[e.which];
                        if (that.selectpicker.keydown.resetKeyHistory.cancel) clearTimeout(that.selectpicker.keydown.resetKeyHistory.cancel);
                        that.selectpicker.keydown.resetKeyHistory.cancel = that.selectpicker.keydown.resetKeyHistory.start();
                        keyHistory = that.selectpicker.keydown.keyHistory;
                        if (/^(.)\1+$/.test(keyHistory)) keyHistory = keyHistory.charAt(0);
                        for (var i = 0; i < that.selectpicker.current.data.length; i++) {
                            var hasMatch, li = that.selectpicker.current.data[i];
                            hasMatch = stringSearch(li, keyHistory, "startsWith", true);
                            if (hasMatch && that.selectpicker.view.canHighlight[i]) matches.push(li.index);
                        }
                        if (matches.length) {
                            var matchIndex = 0;
                            $items.removeClass("active").find("a").removeClass("active");
                            if (1 === keyHistory.length) {
                                matchIndex = matches.indexOf(that.activeIndex);
                                if (-1 === matchIndex || matchIndex === matches.length - 1) matchIndex = 0; else matchIndex++;
                            }
                            searchMatch = matches[matchIndex];
                            activeLi = that.selectpicker.main.data[searchMatch];
                            if (scrollTop - activeLi.position > 0) {
                                offset = activeLi.position - activeLi.height;
                                updateScroll = true;
                            } else {
                                offset = activeLi.position - that.sizeInfo.menuInnerHeight;
                                updateScroll = activeLi.position > scrollTop + that.sizeInfo.menuInnerHeight;
                            }
                            liActive = that.selectpicker.main.elements[searchMatch];
                            that.activeIndex = matches[matchIndex];
                            that.focusItem(liActive);
                            if (liActive) liActive.firstChild.focus();
                            if (updateScroll) that.$menuInner[0].scrollTop = offset;
                            $this.trigger("focus");
                        }
                    }
                    if (isActive && (e.which === keyCodes.SPACE && !that.selectpicker.keydown.keyHistory || e.which === keyCodes.ENTER || e.which === keyCodes.TAB && that.options.selectOnTab)) {
                        if (e.which !== keyCodes.SPACE) e.preventDefault();
                        if (!that.options.liveSearch || e.which !== keyCodes.SPACE) {
                            that.$menuInner.find(".active a").trigger("click", true);
                            $this.trigger("focus");
                            if (!that.options.liveSearch) {
                                e.preventDefault();
                                $(document).data("spaceSelect", true);
                            }
                        }
                    }
                },
                mobile: function() {
                    this.$element[0].classList.add("mobile-device");
                },
                refresh: function() {
                    var config = $.extend({}, this.options, this.$element.data());
                    this.options = config;
                    this.checkDisabled();
                    this.setStyle();
                    this.render();
                    this.buildData();
                    this.buildList();
                    this.setWidth();
                    this.setSize(true);
                    this.$element.trigger("refreshed" + EVENT_KEY);
                },
                hide: function() {
                    this.$newElement.hide();
                },
                show: function() {
                    this.$newElement.show();
                },
                remove: function() {
                    this.$newElement.remove();
                    this.$element.remove();
                },
                destroy: function() {
                    this.$newElement.before(this.$element).remove();
                    if (this.$bsContainer) this.$bsContainer.remove(); else this.$menu.remove();
                    this.$element.off(EVENT_KEY).removeData("selectpicker").removeClass("bs-select-hidden selectpicker");
                    $(window).off(EVENT_KEY + "." + this.selectId);
                }
            };
            function Plugin(option) {
                var args = arguments;
                var _option = option;
                [].shift.apply(args);
                if (!version.success) {
                    try {
                        version.full = ($.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split(".");
                    } catch (err) {
                        if (Selectpicker.BootstrapVersion) version.full = Selectpicker.BootstrapVersion.split(" ")[0].split("."); else {
                            version.full = [ version.major, "0", "0" ];
                            console.warn("There was an issue retrieving Bootstrap's version. " + "Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. " + "If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.", err);
                        }
                    }
                    version.major = version.full[0];
                    version.success = true;
                }
                if ("4" === version.major) {
                    var toUpdate = [];
                    if (Selectpicker.DEFAULTS.style === classNames.BUTTONCLASS) toUpdate.push({
                        name: "style",
                        className: "BUTTONCLASS"
                    });
                    if (Selectpicker.DEFAULTS.iconBase === classNames.ICONBASE) toUpdate.push({
                        name: "iconBase",
                        className: "ICONBASE"
                    });
                    if (Selectpicker.DEFAULTS.tickIcon === classNames.TICKICON) toUpdate.push({
                        name: "tickIcon",
                        className: "TICKICON"
                    });
                    classNames.DIVIDER = "dropdown-divider";
                    classNames.SHOW = "show";
                    classNames.BUTTONCLASS = "btn-light";
                    classNames.POPOVERHEADER = "popover-header";
                    classNames.ICONBASE = "";
                    classNames.TICKICON = "bs-ok-default";
                    for (var i = 0; i < toUpdate.length; i++) {
                        option = toUpdate[i];
                        Selectpicker.DEFAULTS[option.name] = classNames[option.className];
                    }
                }
                var value;
                var chain = this.each((function() {
                    var $this = $(this);
                    if ($this.is("select")) {
                        var data = $this.data("selectpicker"), options = "object" == typeof _option && _option;
                        if (!data) {
                            var dataAttributes = $this.data();
                            for (var dataAttr in dataAttributes) if (dataAttributes.hasOwnProperty(dataAttr) && -1 !== $.inArray(dataAttr, DISALLOWED_ATTRIBUTES)) delete dataAttributes[dataAttr];
                            var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, dataAttributes, options);
                            config.template = $.extend({}, Selectpicker.DEFAULTS.template, $.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}, dataAttributes.template, options.template);
                            $this.data("selectpicker", data = new Selectpicker(this, config));
                        } else if (options) for (var i in options) if (options.hasOwnProperty(i)) data.options[i] = options[i];
                        if ("string" == typeof _option) if (data[_option] instanceof Function) value = data[_option].apply(data, args); else value = data.options[_option];
                    }
                }));
                if ("undefined" !== typeof value) return value; else return chain;
            }
            var old = $.fn.selectpicker;
            $.fn.selectpicker = Plugin;
            $.fn.selectpicker.Constructor = Selectpicker;
            $.fn.selectpicker.noConflict = function() {
                $.fn.selectpicker = old;
                return this;
            };
            var bootstrapKeydown = $.fn.dropdown.Constructor._dataApiKeydownHandler || $.fn.dropdown.Constructor.prototype.keydown;
            $(document).off("keydown.bs.dropdown.data-api").on("keydown.bs.dropdown.data-api", ':not(.bootstrap-select) > [data-toggle="dropdown"]', bootstrapKeydown).on("keydown.bs.dropdown.data-api", ":not(.bootstrap-select) > .dropdown-menu", bootstrapKeydown).on("keydown" + EVENT_KEY, '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', Selectpicker.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', (function(e) {
                e.stopPropagation();
            }));
            $(window).on("load" + EVENT_KEY + ".data-api", (function() {
                $(".selectpicker").each((function() {
                    var $selectpicker = $(this);
                    Plugin.call($selectpicker, $selectpicker.data());
                }));
            }));
        })(jQuery);
    }));
    $(document).ready((function() {
        $("select").selectpicker({
            dropupAuto: false,
            doneButtonText: "Search"
        });
    }));
    window["FLS"] = false;
    isWebp();
    menuInit();
    spollers();
    tabs();
    formFieldsInit({
        autoHeight: true
    });
})();