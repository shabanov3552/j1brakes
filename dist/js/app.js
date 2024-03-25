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
                el.style.paddingRight = window.innerWidth - document.querySelector("body").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector("body").offsetWidth + "px";
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
    (function($) {
        "use strict";
        if (!String.prototype.includes) (function() {
            "use strict";
            var toString = {}.toString;
            var defineProperty = function() {
                try {
                    var object = {};
                    var $defineProperty = Object.defineProperty;
                    var result = $defineProperty(object, object, object) && $defineProperty;
                } catch (error) {}
                return result;
            }();
            var indexOf = "".indexOf;
            var includes = function(search) {
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
                return -1 != indexOf.call(string, searchString, pos);
            };
            if (defineProperty) defineProperty(String.prototype, "includes", {
                value: includes,
                configurable: true,
                writable: true
            }); else String.prototype.includes = includes;
        })();
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
        $.fn.triggerNative = function(eventName) {
            var event, el = this[0];
            if (el.dispatchEvent) {
                if ("function" === typeof Event) event = new Event(eventName, {
                    bubbles: true
                }); else {
                    event = document.createEvent("Event");
                    event.initEvent(eventName, true, false);
                }
                el.dispatchEvent(event);
            } else {
                if (el.fireEvent) {
                    event = document.createEventObject();
                    event.eventType = eventName;
                    el.fireEvent("on" + eventName, event);
                }
                this.trigger(eventName);
            }
        };
        $.expr[":"].icontains = function(obj, index, meta) {
            var $obj = $(obj);
            var haystack = ($obj.data("tokens") || $obj.text()).toUpperCase();
            return haystack.includes(meta[3].toUpperCase());
        };
        $.expr[":"].ibegins = function(obj, index, meta) {
            var $obj = $(obj);
            var haystack = ($obj.data("tokens") || $obj.text()).toUpperCase();
            return haystack.startsWith(meta[3].toUpperCase());
        };
        $.expr[":"].aicontains = function(obj, index, meta) {
            var $obj = $(obj);
            var haystack = ($obj.data("tokens") || $obj.data("normalizedText") || $obj.text()).toUpperCase();
            return haystack.includes(meta[3].toUpperCase());
        };
        $.expr[":"].aibegins = function(obj, index, meta) {
            var $obj = $(obj);
            var haystack = ($obj.data("tokens") || $obj.data("normalizedText") || $obj.text()).toUpperCase();
            return haystack.startsWith(meta[3].toUpperCase());
        };
        function normalizeToBase(text) {
            var rExps = [ {
                re: /[\xC0-\xC6]/g,
                ch: "A"
            }, {
                re: /[\xE0-\xE6]/g,
                ch: "a"
            }, {
                re: /[\xC8-\xCB]/g,
                ch: "E"
            }, {
                re: /[\xE8-\xEB]/g,
                ch: "e"
            }, {
                re: /[\xCC-\xCF]/g,
                ch: "I"
            }, {
                re: /[\xEC-\xEF]/g,
                ch: "i"
            }, {
                re: /[\xD2-\xD6]/g,
                ch: "O"
            }, {
                re: /[\xF2-\xF6]/g,
                ch: "o"
            }, {
                re: /[\xD9-\xDC]/g,
                ch: "U"
            }, {
                re: /[\xF9-\xFC]/g,
                ch: "u"
            }, {
                re: /[\xC7-\xE7]/g,
                ch: "c"
            }, {
                re: /[\xD1]/g,
                ch: "N"
            }, {
                re: /[\xF1]/g,
                ch: "n"
            } ];
            $.each(rExps, (function() {
                text = text.replace(this.re, this.ch);
            }));
            return text;
        }
        function htmlEscape(html) {
            var escapeMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            };
            var source = "(?:" + Object.keys(escapeMap).join("|") + ")", testRegexp = new RegExp(source), replaceRegexp = new RegExp(source, "g"), string = null == html ? "" : "" + html;
            return testRegexp.test(string) ? string.replace(replaceRegexp, (function(match) {
                return escapeMap[match];
            })) : string;
        }
        var Selectpicker = function(element, options, e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            this.$element = $(element);
            this.$newElement = null;
            this.$button = null;
            this.$menu = null;
            this.$lis = null;
            this.options = options;
            if (null === this.options.title) this.options.title = this.$element.attr("title");
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
        Selectpicker.VERSION = "1.9.4";
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
            style: "btn-default",
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
            iconBase: "glyphicon",
            tickIcon: "glyphicon-ok",
            template: {
                caret: '<span class="caret"></span>'
            },
            maxOptions: false,
            groupSelectOptions: false,
            mobile: false,
            selectOnTab: false,
            dropdownAlignRight: false
        };
        Selectpicker.prototype = {
            constructor: Selectpicker,
            init: function() {
                var that = this, id = this.$element.attr("id");
                this.$element.addClass("bs-select-hidden");
                this.liObj = {};
                this.multiple = this.$element.prop("multiple");
                this.autofocus = this.$element.prop("autofocus");
                this.$newElement = this.createView();
                this.$element.after(this.$newElement).appendTo(this.$newElement);
                this.$button = this.$newElement.children("button");
                this.$menu = this.$newElement.children(".dropdown-menu");
                this.$menuInner = this.$menu.children(".inner");
                this.$searchbox = this.$menu.find("input");
                if (this.options.dropdownAlignRight) this.$menu.addClass("dropdown-menu-right");
                if ("undefined" !== typeof id) {
                    this.$button.attr("data-id", id);
                    $('label[for="' + id + '"]').click((function(e) {
                        e.preventDefault();
                        that.$button.focus();
                    }));
                }
                this.checkDisabled();
                this.clickListener();
                if (this.options.liveSearch) this.liveSearchListener();
                this.render();
                this.setStyle();
                this.setWidth();
                if (this.options.container) this.selectPosition();
                this.$menu.data("this", this);
                this.$newElement.data("this", this);
                if (this.options.mobile) this.mobile();
                this.$newElement.on({
                    "hide.bs.dropdown": function(e) {
                        that.$element.trigger("hide.bs.select", e);
                    },
                    "hidden.bs.dropdown": function(e) {
                        that.$element.trigger("hidden.bs.select", e);
                    },
                    "show.bs.dropdown": function(e) {
                        that.$element.trigger("show.bs.select", e);
                    },
                    "shown.bs.dropdown": function(e) {
                        that.$element.trigger("shown.bs.select", e);
                    }
                });
                if (that.$element[0].hasAttribute("required")) this.$element.on("invalid", (function() {
                    that.$button.addClass("bs-invalid").focus();
                    that.$element.on({
                        "focus.bs.select": function() {
                            that.$button.focus();
                            that.$element.off("focus.bs.select");
                        },
                        "shown.bs.select": function() {
                            that.$element.val(that.$element.val()).off("shown.bs.select");
                        },
                        "rendered.bs.select": function() {
                            if (this.validity.valid) that.$button.removeClass("bs-invalid");
                            that.$element.off("rendered.bs.select");
                        }
                    });
                }));
                setTimeout((function() {
                    that.$element.trigger("loaded.bs.select");
                }));
            },
            createDropdown: function() {
                var multiple = this.multiple ? " show-tick" : "", inputGroup = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "", autofocus = this.autofocus ? " autofocus" : "";
                var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "";
                var searchbox = this.options.liveSearch ? '<div class="bs-searchbox">' + '<input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ">" + "</div>" : "";
                var actionsbox = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox">' + '<div class="btn-group btn-group-sm btn-block">' + '<button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + "</button>" + '<button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button>" + "</div>" + "</div>" : "";
                var donebutton = this.multiple && this.options.doneButton ? '<div class="bs-donebutton">' + '<div class="btn-group btn-block">' + '<button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button>" + "</div>" + "</div>" : "";
                var drop = '<div class="btn-group bootstrap-select' + multiple + inputGroup + '">' + '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + ">" + '<span class="filter-option pull-left"></span>&nbsp;' + '<span class="bs-caret">' + this.options.template.caret + "</span>" + "</button>" + '<div class="dropdown-menu open">' + header + searchbox + actionsbox + '<ul class="dropdown-menu inner" role="menu">' + "</ul>" + donebutton + "</div>" + "</div>";
                return $(drop);
            },
            createView: function() {
                var $drop = this.createDropdown(), li = this.createLi();
                $drop.find("ul")[0].innerHTML = li;
                return $drop;
            },
            reloadLi: function() {
                this.destroyLi();
                var li = this.createLi();
                this.$menuInner[0].innerHTML = li;
            },
            destroyLi: function() {
                this.$menu.find("li").remove();
            },
            createLi: function() {
                var that = this, _li = [], optID = 0, titleOption = document.createElement("option"), liIndex = -1;
                var generateLI = function(content, index, classes, optgroup) {
                    return "<li" + ("undefined" !== typeof classes & "" !== classes ? ' class="' + classes + '"' : "") + ("undefined" !== typeof index & null !== index ? ' data-original-index="' + index + '"' : "") + ("undefined" !== typeof optgroup & null !== optgroup ? 'data-optgroup="' + optgroup + '"' : "") + ">" + content + "</li>";
                };
                var generateA = function(text, classes, inline, tokens) {
                    return '<a tabindex="0"' + ("undefined" !== typeof classes ? ' class="' + classes + '"' : "") + ("undefined" !== typeof inline ? ' style="' + inline + '"' : "") + (that.options.liveSearchNormalize ? ' data-normalized-text="' + normalizeToBase(htmlEscape(text)) + '"' : "") + ("undefined" !== typeof tokens || null !== tokens ? ' data-tokens="' + tokens + '"' : "") + ">" + text + '<span class="' + that.options.iconBase + " " + that.options.tickIcon + ' check-mark"></span>' + "</a>";
                };
                if (this.options.title && !this.multiple) {
                    liIndex--;
                    if (!this.$element.find(".bs-title-option").length) {
                        var element = this.$element[0];
                        titleOption.className = "bs-title-option";
                        titleOption.appendChild(document.createTextNode(this.options.title));
                        titleOption.value = "";
                        element.insertBefore(titleOption, element.firstChild);
                        if (void 0 === $(element.options[element.selectedIndex]).attr("selected")) titleOption.selected = true;
                    }
                }
                this.$element.find("option").each((function(index) {
                    var $this = $(this);
                    liIndex++;
                    if ($this.hasClass("bs-title-option")) return;
                    var optionClass = this.className || "", inline = this.style.cssText, text = $this.data("content") ? $this.data("content") : $this.html(), tokens = $this.data("tokens") ? $this.data("tokens") : null, subtext = "undefined" !== typeof $this.data("subtext") ? '<small class="text-muted">' + $this.data("subtext") + "</small>" : "", maintext = "undefined" !== typeof $this.data("maintext") ? '<span class="text-muted" style="float: left;min-width: 80px;">' + $this.data("maintext") + " </span>" : "", _value1 = "undefined" !== typeof $this.data("value1") ? $this.data("value1") : "", _value2 = "undefined" !== typeof $this.data("value2") ? $this.data("value2") : "", icon = "undefined" !== typeof $this.data("icon") ? '<span class="' + that.options.iconBase + " " + $this.data("icon") + '"></span> ' : "", isOptgroup = "OPTGROUP" === this.parentNode.tagName, isDisabled = this.disabled || isOptgroup && this.parentNode.disabled;
                    if ("" !== icon && isDisabled) icon = "<span>" + icon + "</span>";
                    if (that.options.hideDisabled && isDisabled && !isOptgroup) {
                        liIndex--;
                        return;
                    }
                    if (!$this.data("content")) text = icon + '<span class="text" value1="' + _value1 + '" value2="' + _value2 + '">' + maintext + text + subtext + "</span>";
                    if (isOptgroup && true !== $this.data("divider")) {
                        var optGroupClass = " " + this.parentNode.className || 0;
                        if (0 === $this.index()) {
                            optID += 1;
                            var label = this.parentNode.label, labelSubtext = "undefined" !== typeof $this.parent().data("subtext") ? '<small class="text-muted">' + $this.parent().data("subtext") + "</small>" : "", labelMaintext = "undefined" !== typeof $this.parent().data("maintext") ? '<small class="text-muted">' + $this.parent().data("maintext") + "</small>" : "", labelIcon = $this.parent().data("icon") ? '<span class="' + that.options.iconBase + " " + $this.parent().data("icon") + '"></span> ' : "";
                            label = labelIcon + '<span class="text">' + labelMaintext + label + labelSubtext + "</span>";
                            if (0 !== index && _li.length > 0) {
                                liIndex++;
                                _li.push(generateLI("", null, "divider", optID + "div"));
                            }
                            liIndex++;
                            _li.push(generateLI(label, null, "dropdown-header" + optGroupClass, optID));
                        }
                        if (that.options.hideDisabled && isDisabled) {
                            liIndex--;
                            return;
                        }
                        _li.push(generateLI(generateA(text, "opt " + optionClass + optGroupClass, inline, tokens), index, "", optID));
                    } else if (true === $this.data("divider")) _li.push(generateLI("", index, "divider")); else if (true === $this.data("hidden")) _li.push(generateLI(generateA(text, optionClass, inline, tokens), index, "hidden is-hidden")); else {
                        if (this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName) {
                            liIndex++;
                            _li.push(generateLI("", null, "divider", optID + "div"));
                        }
                        _li.push(generateLI(generateA(text, optionClass, inline, tokens), index));
                    }
                    that.liObj[index] = liIndex;
                }));
                if (!this.multiple && 0 === this.$element.find("option:selected").length && !this.options.title) this.$element.find("option").eq(0).prop("selected", true).attr("selected", "selected");
                return _li.join("");
            },
            findLis: function() {
                if (null == this.$lis) this.$lis = this.$menu.find("li");
                return this.$lis;
            },
            render: function(updateLi) {
                var notDisabled, that = this;
                if (false !== updateLi) this.$element.find("option").each((function(index) {
                    var $lis = that.findLis().eq(that.liObj[index]);
                    that.setDisabled(index, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, $lis);
                    that.setSelected(index, this.selected, $lis);
                }));
                this.tabIndex();
                var selectedItems = this.$element.find("option").map((function() {
                    if (this.selected) {
                        if (that.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
                        var subtext, $this = $(this), icon = $this.data("icon") && that.options.showIcon ? '<i class="' + that.options.iconBase + " " + $this.data("icon") + '"></i> ' : "";
                        if (that.options.showSubtext && $this.data("subtext") && !that.multiple) subtext = ' <small class="text-muted">' + $this.data("subtext") + "</small>"; else subtext = "";
                        if ("undefined" !== typeof $this.attr("title")) return $this.attr("title"); else if ($this.data("content") && that.options.showContent) return $this.data("content"); else return icon + $this.html() + subtext;
                    }
                })).toArray();
                var title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);
                if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                    var max = this.options.selectedTextFormat.split(">");
                    if (max.length > 1 && selectedItems.length > max[1] || 1 == max.length && selectedItems.length >= 2) {
                        notDisabled = this.options.hideDisabled ? ", [disabled]" : "";
                        var totalCount = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length, tr8nText = "function" === typeof this.options.countSelectedText ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
                        title = tr8nText.replace("{0}", selectedItems.length.toString()).replace("{1}", totalCount.toString());
                    }
                }
                if (void 0 == this.options.title) this.options.title = this.$element.attr("title");
                if ("static" == this.options.selectedTextFormat) title = this.options.title;
                if (!title) title = "undefined" !== typeof this.options.title ? this.options.title : this.options.noneSelectedText;
                this.$button.attr("title", $.trim(title.replace(/<[^>]*>?/g, "")));
                this.$button.children(".filter-option").html(title);
                this.$element.trigger("rendered.bs.select");
            },
            setStyle: function(style, status) {
                if (this.$element.attr("class")) this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                var buttonClass = style ? style : this.options.style;
                if ("add" == status) this.$button.addClass(buttonClass); else if ("remove" == status) this.$button.removeClass(buttonClass); else {
                    this.$button.removeClass(this.options.style);
                    this.$button.addClass(buttonClass);
                }
            },
            liHeight: function(refresh) {
                if (!refresh && (false === this.options.size || this.sizeInfo)) return;
                var newElement = document.createElement("div"), menu = document.createElement("div"), menuInner = document.createElement("ul"), divider = document.createElement("li"), li = document.createElement("li"), a = document.createElement("a"), text = document.createElement("span"), header = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(true) : null, search = this.options.liveSearch ? document.createElement("div") : null, actions = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(true) : null, doneButton = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(true) : null;
                text.className = "text";
                newElement.className = this.$menu[0].parentNode.className + " open";
                menu.className = "dropdown-menu open";
                menuInner.className = "dropdown-menu inner";
                divider.className = "divider";
                text.appendChild(document.createTextNode("Inner text"));
                a.appendChild(text);
                li.appendChild(a);
                menuInner.appendChild(li);
                menuInner.appendChild(divider);
                if (header) menu.appendChild(header);
                if (search) {
                    var input = document.createElement("span");
                    search.className = "bs-searchbox";
                    input.className = "form-control";
                    search.appendChild(input);
                    menu.appendChild(search);
                }
                if (actions) menu.appendChild(actions);
                menu.appendChild(menuInner);
                if (doneButton) menu.appendChild(doneButton);
                newElement.appendChild(menu);
                document.body.appendChild(newElement);
                var liHeight = a.offsetHeight, headerHeight = header ? header.offsetHeight : 0, searchHeight = search ? search.offsetHeight : 0, actionsHeight = actions ? actions.offsetHeight : 0, doneButtonHeight = doneButton ? doneButton.offsetHeight : 0, dividerHeight = $(divider).outerHeight(true), menuStyle = "function" === typeof getComputedStyle ? getComputedStyle(menu) : false, $menu = menuStyle ? null : $(menu), menuPadding = parseInt(menuStyle ? menuStyle.paddingTop : $menu.css("paddingTop")) + parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css("paddingBottom")) + parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css("borderTopWidth")) + parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css("borderBottomWidth")), menuExtras = menuPadding + parseInt(menuStyle ? menuStyle.marginTop : $menu.css("marginTop")) + parseInt(menuStyle ? menuStyle.marginBottom : $menu.css("marginBottom")) + 2;
                document.body.removeChild(newElement);
                this.sizeInfo = {
                    liHeight,
                    headerHeight,
                    searchHeight,
                    actionsHeight,
                    doneButtonHeight,
                    dividerHeight,
                    menuPadding,
                    menuExtras
                };
            },
            setSize: function() {
                this.findLis();
                this.liHeight();
                if (this.options.header) this.$menu.css("padding-top", 0);
                if (false === this.options.size) return;
                var menuHeight, getHeight, selectOffsetTop, selectOffsetBot, that = this, $menu = this.$menu, $menuInner = this.$menuInner, $window = $(window), selectHeight = this.$newElement[0].offsetHeight, liHeight = this.sizeInfo["liHeight"], headerHeight = this.sizeInfo["headerHeight"], searchHeight = this.sizeInfo["searchHeight"], actionsHeight = this.sizeInfo["actionsHeight"], doneButtonHeight = this.sizeInfo["doneButtonHeight"], divHeight = this.sizeInfo["dividerHeight"], menuPadding = this.sizeInfo["menuPadding"], menuExtras = this.sizeInfo["menuExtras"], notDisabled = this.options.hideDisabled ? ".disabled" : "", posVert = function() {
                    selectOffsetTop = that.$newElement.offset().top - $window.scrollTop();
                    selectOffsetBot = $window.height() - selectOffsetTop - selectHeight;
                };
                posVert();
                if ("auto" === this.options.size) {
                    var getSize = function() {
                        var minHeight, hasClass = function(className, include) {
                            return function(element) {
                                if (include) return element.classList ? element.classList.contains(className) : $(element).hasClass(className); else return !(element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                            };
                        }, lis = that.$menuInner[0].getElementsByTagName("li"), lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass("hidden", false)) : that.$lis.not(".hidden"), optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass("dropdown-header", true)) : lisVisible.filter(".dropdown-header");
                        posVert();
                        menuHeight = selectOffsetBot - menuExtras;
                        if (that.options.container) {
                            if (!$menu.data("height")) $menu.data("height", $menu.height());
                            getHeight = $menu.data("height");
                        } else getHeight = $menu.height();
                        if (that.options.dropupAuto) that.$newElement.toggleClass("dropup", selectOffsetTop > selectOffsetBot && menuHeight - menuExtras < getHeight);
                        if (that.$newElement.hasClass("dropup")) menuHeight = selectOffsetTop - menuExtras;
                        if (lisVisible.length + optGroup.length > 3) minHeight = 3 * liHeight + menuExtras - 2; else minHeight = 0;
                        $menu.css({
                            "max-height": menuHeight + "px",
                            overflow: "hidden",
                            "min-height": minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + "px"
                        });
                        $menuInner.css({
                            "max-height": menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding + "px",
                            "overflow-y": "auto",
                            "min-height": Math.max(minHeight - menuPadding, 0) + "px"
                        });
                    };
                    getSize();
                    this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", getSize);
                    $window.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", getSize);
                } else if (this.options.size && "auto" != this.options.size && this.$lis.not(notDisabled).length > this.options.size) {
                    var optIndex = this.$lis.not(".divider").not(notDisabled).children().slice(0, this.options.size).last().parent().index(), divLength = this.$lis.slice(0, optIndex + 1).filter(".divider").length;
                    menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding;
                    if (that.options.container) {
                        if (!$menu.data("height")) $menu.data("height", $menu.height());
                        getHeight = $menu.data("height");
                    } else getHeight = $menu.height();
                    if (that.options.dropupAuto) this.$newElement.toggleClass("dropup", selectOffsetTop > selectOffsetBot && menuHeight - menuExtras < getHeight);
                    $menu.css({
                        "max-height": menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 15 + "px",
                        overflow: "hidden",
                        "min-height": ""
                    });
                    $menuInner.css({
                        "max-height": menuHeight - menuPadding + "px",
                        "overflow-y": "auto",
                        "min-height": ""
                    });
                }
            },
            setWidth: function() {
                if ("auto" === this.options.width) {
                    this.$menu.css("min-width", "0");
                    var $selectClone = this.$menu.parent().clone().appendTo("body"), $selectClone2 = this.options.container ? this.$newElement.clone().appendTo("body") : $selectClone, ulWidth = $selectClone.children(".dropdown-menu").outerWidth(), btnWidth = $selectClone2.css("width", "auto").children("button").outerWidth();
                    $selectClone.remove();
                    $selectClone2.remove();
                    this.$newElement.css("width", Math.max(ulWidth, btnWidth) + "px");
                } else if ("fit" === this.options.width) {
                    this.$menu.css("min-width", "");
                    this.$newElement.css("width", "").addClass("fit-width");
                } else if (this.options.width) {
                    this.$menu.css("min-width", "");
                    this.$newElement.css("width", this.options.width);
                } else {
                    this.$menu.css("min-width", "");
                    this.$newElement.css("width", "");
                }
                if (this.$newElement.hasClass("fit-width") && "fit" !== this.options.width) this.$newElement.removeClass("fit-width");
            },
            selectPosition: function() {
                this.$bsContainer = $('<div class="bs-container" />');
                var pos, actualHeight, that = this, getPlacement = function($element) {
                    that.$bsContainer.addClass($element.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", $element.hasClass("dropup"));
                    pos = $element.offset();
                    actualHeight = $element.hasClass("dropup") ? 0 : $element[0].offsetHeight;
                    that.$bsContainer.css({
                        top: pos.top + actualHeight,
                        left: pos.left,
                        width: $element[0].offsetWidth
                    });
                };
                this.$button.on("click", (function() {
                    var $this = $(this);
                    if (that.isDisabled()) return;
                    getPlacement(that.$newElement);
                    that.$bsContainer.appendTo(that.options.container).toggleClass("open", !$this.hasClass("open")).append(that.$menu);
                }));
                $(window).on("resize scroll", (function() {
                    getPlacement(that.$newElement);
                }));
                this.$element.on("hide.bs.select", (function() {
                    that.$menu.data("height", that.$menu.height());
                    that.$bsContainer.detach();
                }));
            },
            setSelected: function(index, selected, $lis) {
                if (!$lis) $lis = this.findLis().eq(this.liObj[index]);
                $lis.toggleClass("selected", selected);
            },
            setDisabled: function(index, disabled, $lis) {
                if (!$lis) $lis = this.findLis().eq(this.liObj[index]);
                if (disabled) $lis.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1); else $lis.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0);
            },
            isDisabled: function() {
                return this.$element[0].disabled;
            },
            checkDisabled: function() {
                var that = this;
                if (this.isDisabled()) {
                    this.$newElement.addClass("disabled");
                    this.$button.addClass("disabled").attr("tabindex", -1);
                } else {
                    if (this.$button.hasClass("disabled")) {
                        this.$newElement.removeClass("disabled");
                        this.$button.removeClass("disabled");
                    }
                    if (-1 == this.$button.attr("tabindex") && !this.$element.data("tabindex")) this.$button.removeAttr("tabindex");
                }
                this.$button.click((function() {
                    return !that.isDisabled();
                }));
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
                this.$newElement.on("touchstart.dropdown", ".dropdown-menu", (function(e) {
                    e.stopPropagation();
                }));
                $document.data("spaceSelect", false);
                this.$button.on("keyup", (function(e) {
                    if (/(32)/.test(e.keyCode.toString(10)) && $document.data("spaceSelect")) {
                        e.preventDefault();
                        $document.data("spaceSelect", false);
                    }
                }));
                this.$button.on("click", (function() {
                    that.setSize();
                    that.$element.on("shown.bs.select", (function() {
                        if (!that.options.liveSearch && !that.multiple) that.$menuInner.find(".selected a").focus(); else if (!that.multiple) {
                            var selectedIndex = that.liObj[that.$element[0].selectedIndex];
                            if ("number" !== typeof selectedIndex || false === that.options.size) return;
                            var offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
                            offset = offset - that.$menuInner[0].offsetHeight / 2 + that.sizeInfo.liHeight / 2;
                            that.$menuInner[0].scrollTop = offset;
                        }
                    }));
                }));
                this.$menuInner.on("click", "li a", (function(e) {
                    var $this = $(this), clickedIndex = $this.parent().data("originalIndex"), prevValue = that.$element.val(), prevIndex = that.$element.prop("selectedIndex");
                    if (that.multiple) e.stopPropagation();
                    e.preventDefault();
                    if (!that.isDisabled() && !$this.parent().hasClass("disabled")) {
                        var $options = that.$element.find("option"), $option = $options.eq(clickedIndex), state = $option.prop("selected"), $optgroup = $option.parent("optgroup"), maxOptions = that.options.maxOptions, maxOptionsGrp = $optgroup.data("maxOptions") || false;
                        if (!that.multiple) {
                            $options.prop("selected", false);
                            $option.prop("selected", true);
                            that.$menuInner.find(".selected").removeClass("selected");
                            that.setSelected(clickedIndex, true);
                        } else {
                            $option.prop("selected", !state);
                            that.setSelected(clickedIndex, !state);
                            $this.blur();
                            if (false !== maxOptions || false !== maxOptionsGrp) {
                                var maxReached = maxOptions < $options.filter(":selected").length, maxReachedGrp = maxOptionsGrp < $optgroup.find("option:selected").length;
                                if (maxOptions && maxReached || maxOptionsGrp && maxReachedGrp) if (maxOptions && 1 == maxOptions) {
                                    $options.prop("selected", false);
                                    $option.prop("selected", true);
                                    that.$menuInner.find(".selected").removeClass("selected");
                                    that.setSelected(clickedIndex, true);
                                } else if (maxOptionsGrp && 1 == maxOptionsGrp) {
                                    $optgroup.find("option:selected").prop("selected", false);
                                    $option.prop("selected", true);
                                    var optgroupID = $this.parent().data("optgroup");
                                    that.$menuInner.find('[data-optgroup="' + optgroupID + '"]').removeClass("selected");
                                    that.setSelected(clickedIndex, true);
                                } else {
                                    var maxOptionsArr = "function" === typeof that.options.maxOptionsText ? that.options.maxOptionsText(maxOptions, maxOptionsGrp) : that.options.maxOptionsText, maxTxt = maxOptionsArr[0].replace("{n}", maxOptions), maxTxtGrp = maxOptionsArr[1].replace("{n}", maxOptionsGrp), $notify = $('<div class="notify"></div>');
                                    if (maxOptionsArr[2]) {
                                        maxTxt = maxTxt.replace("{var}", maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                                        maxTxtGrp = maxTxtGrp.replace("{var}", maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                                    }
                                    $option.prop("selected", false);
                                    that.$menu.append($notify);
                                    if (maxOptions && maxReached) {
                                        $notify.append($("<div>" + maxTxt + "</div>"));
                                        that.$element.trigger("maxReached.bs.select");
                                    }
                                    if (maxOptionsGrp && maxReachedGrp) {
                                        $notify.append($("<div>" + maxTxtGrp + "</div>"));
                                        that.$element.trigger("maxReachedGrp.bs.select");
                                    }
                                    setTimeout((function() {
                                        that.setSelected(clickedIndex, false);
                                    }), 10);
                                    $notify.delay(750).fadeOut(300, (function() {
                                        $(this).remove();
                                    }));
                                }
                            }
                        }
                        if (!that.multiple) that.$button.focus(); else if (that.options.liveSearch) that.$searchbox.focus();
                        if (prevValue != that.$element.val() && that.multiple || prevIndex != that.$element.prop("selectedIndex") && !that.multiple) {
                            that.$element.triggerNative("change");
                            that.$element.trigger("changed.bs.select", [ clickedIndex, $option.prop("selected"), state ]);
                        }
                    }
                    if (that.multiple && that.options.groupSelectOptions) if ("undefined" !== typeof $option.attr("data-value1") && "undefined" !== typeof $option.attr("data-value2")) {
                        status = true;
                        that.findLis();
                        $options = that.$element.find("option"), $option = $options.eq(clickedIndex);
                        var $lisVisible = that.$lis.not(".divider, .dropdown-header, .disabled, .hidden"), lisVisLen = $lisVisible.length, selectedOptions = [];
                        if ($option.attr("data-value1") == $option.attr("data-value2") || "ALL" == $option.attr("data-value2")) {
                            if ($option.prop("selected")) for (var i = 0; i < lisVisLen; i++) {
                                var origIndex = $lisVisible[i].getAttribute("data-original-index");
                                if ($options.eq(origIndex).attr("data-value1") == $option.attr("data-value1")) if (!that.$lis.eq(that.liObj[i]).hasClass("selected")) {
                                    that.$lis.eq(that.liObj[i]).toggleClass("selected", status);
                                    selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0];
                                }
                            }
                        } else for (i = 0; i < lisVisLen; i++) {
                            origIndex = $lisVisible[i].getAttribute("data-original-index");
                            if ($options.eq(origIndex).attr("data-value1") == $option.attr("data-value1") && ($options.eq(origIndex).attr("data-value1") == $options.eq(origIndex).attr("data-value2") || "ALL" == $options.eq(origIndex).attr("data-value2"))) if (!that.$lis.eq(that.liObj[i]).hasClass("selected")) {
                                that.$lis.eq(that.liObj[i]).toggleClass("selected", status);
                                selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0];
                            }
                        }
                        $(selectedOptions).prop("selected", status);
                        that.render(false);
                        that.$element.triggerNative("change");
                    }
                }));
                this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", (function(e) {
                    if (e.currentTarget == this) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (that.options.liveSearch && !$(e.target).hasClass("close")) that.$searchbox.focus(); else that.$button.focus();
                    }
                }));
                this.$menuInner.on("click", ".divider, .dropdown-header", (function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (that.options.liveSearch) that.$searchbox.focus(); else that.$button.focus();
                }));
                this.$menu.on("click", ".popover-title .close", (function() {
                    that.$button.click();
                }));
                this.$searchbox.on("click", (function(e) {
                    e.stopPropagation();
                }));
                this.$menu.on("click", ".actions-btn", (function(e) {
                    if (that.options.liveSearch) that.$searchbox.focus(); else that.$button.focus();
                    e.preventDefault();
                    e.stopPropagation();
                    if ($(this).hasClass("bs-select-all")) that.selectAll(); else that.deselectAll();
                    that.$element.triggerNative("change");
                }));
                this.$element.change((function() {
                    that.render(false);
                }));
            },
            liveSearchListener: function() {
                var that = this, $no_results = $('<li class="no-results"></li>');
                this.$button.on("click.dropdown.data-api touchstart.dropdown.data-api", (function() {
                    that.$menuInner.find(".active").removeClass("active");
                    if (!!that.$searchbox.val()) {
                        that.$searchbox.val("");
                        that.$lis.not(".is-hidden").removeClass("hidden");
                        if (!!$no_results.parent().length) $no_results.remove();
                    }
                    if (!that.multiple) that.$menuInner.find(".selected").addClass("active");
                    setTimeout((function() {
                        that.$searchbox.focus();
                    }), 10);
                }));
                this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", (function(e) {
                    e.stopPropagation();
                }));
                this.$searchbox.on("input propertychange", (function() {
                    if (that.$searchbox.val()) {
                        var $searchBase = that.$lis.not(".is-hidden").removeClass("hidden").children("a");
                        if (that.options.liveSearchNormalize) $searchBase = $searchBase.not(":a" + that._searchStyle() + '("' + normalizeToBase(that.$searchbox.val()) + '")'); else $searchBase = $searchBase.not(":" + that._searchStyle() + '("' + that.$searchbox.val() + '")');
                        $searchBase.parent().addClass("hidden");
                        that.$lis.filter(".dropdown-header").each((function() {
                            var $this = $(this), optgroup = $this.data("optgroup");
                            if (0 === that.$lis.filter("[data-optgroup=" + optgroup + "]").not($this).not(".hidden").length) {
                                $this.addClass("hidden");
                                that.$lis.filter("[data-optgroup=" + optgroup + "div]").addClass("hidden");
                            }
                        }));
                        var $lisVisible = that.$lis.not(".hidden");
                        $lisVisible.each((function(index) {
                            var $this = $(this);
                            if ($this.hasClass("divider") && ($this.index() === $lisVisible.first().index() || $this.index() === $lisVisible.last().index() || $lisVisible.eq(index + 1).hasClass("divider"))) $this.addClass("hidden");
                        }));
                        if (!that.$lis.not(".hidden, .no-results").length) {
                            if (!!$no_results.parent().length) $no_results.remove();
                            $no_results.html(that.options.noneResultsText.replace("{0}", '"' + htmlEscape(that.$searchbox.val()) + '"')).show();
                            that.$menuInner.append($no_results);
                        } else if (!!$no_results.parent().length) $no_results.remove();
                    } else {
                        that.$lis.not(".is-hidden").removeClass("hidden");
                        if (!!$no_results.parent().length) $no_results.remove();
                    }
                    that.$lis.filter(".active").removeClass("active");
                    if (that.$searchbox.val()) that.$lis.not(".hidden, .divider, .dropdown-header").eq(0).children("a").focus();
                    $(this).focus();
                }));
            },
            _searchStyle: function() {
                var styles = {
                    begins: "ibegins",
                    startsWith: "ibegins"
                };
                return styles[this.options.liveSearchStyle] || "icontains";
            },
            val: function(value) {
                if ("undefined" !== typeof value) {
                    this.$element.val(value);
                    this.render();
                    return this.$element;
                } else return this.$element.val();
            },
            changeAll: function(status) {
                if ("undefined" === typeof status) status = true;
                this.findLis();
                var $options = this.$element.find("option"), $lisVisible = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").toggleClass("selected", status), lisVisLen = $lisVisible.length, selectedOptions = [];
                for (var i = 0; i < lisVisLen; i++) {
                    var origIndex = $lisVisible[i].getAttribute("data-original-index");
                    selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0];
                }
                $(selectedOptions).prop("selected", status);
                this.render(false);
            },
            selectAll: function() {
                return this.changeAll(true);
            },
            deselectAll: function() {
                return this.changeAll(false);
            },
            keydown: function(e) {
                var $items, index, next, first, last, prev, nextPrev, prevIndex, isActive, $this = $(this), $parent = $this.is("input") ? $this.parent().parent() : $this.parent(), that = $parent.data("this"), selector = ":not(.disabled, .hidden, .dropdown-header, .divider)", keyCodeMap = {
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
                    65: "a",
                    66: "b",
                    67: "c",
                    68: "d",
                    69: "e",
                    70: "f",
                    71: "g",
                    72: "h",
                    73: "i",
                    74: "j",
                    75: "k",
                    76: "l",
                    77: "m",
                    78: "n",
                    79: "o",
                    80: "p",
                    81: "q",
                    82: "r",
                    83: "s",
                    84: "t",
                    85: "u",
                    86: "v",
                    87: "w",
                    88: "x",
                    89: "y",
                    90: "z",
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
                if (that.options.liveSearch) $parent = $this.parent().parent();
                if (that.options.container) $parent = that.$menu;
                $items = $("[role=menu] li", $parent);
                isActive = that.$newElement.hasClass("open");
                if (!isActive && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90)) {
                    if (!that.options.container) {
                        that.setSize();
                        that.$menu.parent().addClass("open");
                        isActive = true;
                    } else that.$button.trigger("click");
                    that.$searchbox.focus();
                }
                if (that.options.liveSearch) {
                    if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && 0 === that.$menu.find(".active").length) {
                        e.preventDefault();
                        that.$menu.parent().removeClass("open");
                        if (that.options.container) that.$newElement.removeClass("open");
                        that.$button.focus();
                    }
                    $items = $("[role=menu] li" + selector, $parent);
                    if (!$this.val() && !/(38|40)/.test(e.keyCode.toString(10))) if (0 === $items.filter(".active").length) {
                        $items = that.$menuInner.find("li");
                        if (that.options.liveSearchNormalize) $items = $items.filter(":a" + that._searchStyle() + "(" + normalizeToBase(keyCodeMap[e.keyCode]) + ")"); else $items = $items.filter(":" + that._searchStyle() + "(" + keyCodeMap[e.keyCode] + ")");
                    }
                }
                if (!$items.length) return;
                if (/(38|40)/.test(e.keyCode.toString(10))) {
                    index = $items.index($items.find("a").filter(":focus").parent());
                    first = $items.filter(selector).first().index();
                    last = $items.filter(selector).last().index();
                    next = $items.eq(index).nextAll(selector).eq(0).index();
                    prev = $items.eq(index).prevAll(selector).eq(0).index();
                    nextPrev = $items.eq(next).prevAll(selector).eq(0).index();
                    if (that.options.liveSearch) {
                        $items.each((function(i) {
                            if (!$(this).hasClass("disabled")) $(this).data("index", i);
                        }));
                        index = $items.index($items.filter(".active"));
                        first = $items.first().data("index");
                        last = $items.last().data("index");
                        next = $items.eq(index).nextAll().eq(0).data("index");
                        prev = $items.eq(index).prevAll().eq(0).data("index");
                        nextPrev = $items.eq(next).prevAll().eq(0).data("index");
                    }
                    prevIndex = $this.data("prevIndex");
                    if (38 == e.keyCode) {
                        if (that.options.liveSearch) index--;
                        if (index != nextPrev && index > prev) index = prev;
                        if (index < first) index = first;
                        if (index == prevIndex) index = last;
                    } else if (40 == e.keyCode) {
                        if (that.options.liveSearch) index++;
                        if (-1 == index) index = 0;
                        if (index != nextPrev && index < next) index = next;
                        if (index > last) index = last;
                        if (index == prevIndex) index = first;
                    }
                    $this.data("prevIndex", index);
                    if (!that.options.liveSearch) $items.eq(index).children("a").focus(); else {
                        e.preventDefault();
                        if (!$this.hasClass("dropdown-toggle")) {
                            $items.removeClass("active").eq(index).addClass("active").children("a").focus();
                            $this.focus();
                        }
                    }
                } else if (!$this.is("input")) {
                    var count, prevKey, keyIndex = [];
                    $items.each((function() {
                        if (!$(this).hasClass("disabled")) if ($.trim($(this).children("a").text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) keyIndex.push($(this).index());
                    }));
                    count = $(document).data("keycount");
                    count++;
                    $(document).data("keycount", count);
                    prevKey = $.trim($(":focus").text().toLowerCase()).substring(0, 1);
                    if (prevKey != keyCodeMap[e.keyCode]) {
                        count = 1;
                        $(document).data("keycount", count);
                    } else if (count >= keyIndex.length) {
                        $(document).data("keycount", 0);
                        if (count > keyIndex.length) count = 1;
                    }
                    $items.eq(keyIndex[count - 1]).children("a").focus();
                }
                if ((/(13|32)/.test(e.keyCode.toString(10)) || /(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab) && isActive) {
                    if (!/(32)/.test(e.keyCode.toString(10))) e.preventDefault();
                    if (!that.options.liveSearch) {
                        var elem = $(":focus");
                        elem.click();
                        elem.focus();
                        e.preventDefault();
                        $(document).data("spaceSelect", true);
                    } else if (!/(32)/.test(e.keyCode.toString(10))) {
                        that.$menuInner.find(".active a").click();
                        $this.focus();
                    }
                    $(document).data("keycount", 0);
                }
                if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch) || /(27)/.test(e.keyCode.toString(10)) && !isActive) {
                    that.$menu.parent().removeClass("open");
                    if (that.options.container) that.$newElement.removeClass("open");
                    that.$button.focus();
                }
            },
            mobile: function() {
                this.$element.addClass("mobile-device");
            },
            refresh: function() {
                this.$lis = null;
                this.liObj = {};
                this.reloadLi();
                this.render();
                this.checkDisabled();
                this.liHeight(true);
                this.setStyle();
                this.setWidth();
                if (this.$lis) this.$searchbox.trigger("propertychange");
                this.$element.trigger("refreshed.bs.select");
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
                this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker");
            }
        };
        function Plugin(option, event) {
            var args = arguments;
            var _option = option, _event = event;
            [].shift.apply(args);
            var value;
            var chain = this.each((function() {
                var $this = $(this);
                if ($this.is("select")) {
                    var data = $this.data("selectpicker"), options = "object" == typeof _option && _option;
                    if (!data) {
                        var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
                        config.template = $.extend({}, Selectpicker.DEFAULTS.template, $.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}, $this.data().template, options.template);
                        $this.data("selectpicker", data = new Selectpicker(this, config, _event));
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
        $(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', Selectpicker.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', (function(e) {
            e.stopPropagation();
        }));
        $(window).on("load.bs.select.data-api", (function() {
            $(".selectpicker").each((function() {
                var $selectpicker = $(this);
                Plugin.call($selectpicker, $selectpicker.data());
            }));
        }));
    })(jQuery);
    $(".products-tabs__link").hover((function() {
        $(this).addClass("_active").siblings().removeClass("_active").closest("div.products-tabs").find("div.products-tabs__item").removeClass("_active").eq($(this).index()).addClass("_active");
    }));
    $(document).ready((function() {
        $("select").selectpicker({
            dropupAuto: false,
            doneButtonText: "Search"
        });
    }));
    window["FLS"] = false;
    isWebp();
    spollers();
    tabs();
    formFieldsInit({
        autoHeight: true
    });
})();