(function(){
var translateObjs = {};
function trans(a, b) {
    var c = arguments['length'] === 0x1 ? [arguments[0x0]] : Array['apply'](null, arguments);
    return translateObjs[c[0x0]] = c, '';
}
function regTextVar(a, b) {
    var c = ![];
    return d(b);
    function d(k, l) {
        switch (k['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var m = (function () {
                switch (k['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }());
            if (m)
                return function () {
                    var r, s, t = (l && l['viewerName'] ? this['getComponentByName'](l['viewerName']) : undefined) || this['getMainViewer']();
                    if (k['toLowerCase']()['startsWith']('photo'))
                        r = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (v) {
                            var w = v['get']('player');
                            return w && w['get']('viewerArea') == t;
                        })['map'](function (v) {
                            return v['get']('media')['get']('playList');
                        });
                    else
                        r = this['_getPlayListsWithViewer'](t), s = j['bind'](this, t);
                    if (!c) {
                        for (var u = 0x0; u < r['length']; ++u) {
                            r[u]['bind']('changing', f, this);
                        }
                        c = !![];
                    }
                    return i['call'](this, r, m, s);
                };
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](k);
            };
        default:
            if (k['toLowerCase']()['startsWith']('viewer.')) {
                var n = k['split']('.'), o = n[0x1];
                if (o) {
                    var p = n['slice'](0x2)['join']('.');
                    return d(p, { 'viewerName': o });
                }
            } else {
                if (k['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                    var q = undefined, m = (function () {
                            switch (k['toLowerCase']()) {
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                            case 'quiz.score':
                                return TDV['Quiz']['PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.time.remaining':
                                return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                            case 'quiz.time.elapsed':
                                return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                            case 'quiz.time.limit':
                                return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.media.questions.answered':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                            case 'quiz.media.question.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTION_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            case 'quiz.media.index':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                            case 'quiz.media.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                            case 'quiz.media.visited':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                            default:
                                var s = /quiz\.([\w_]+)\.(.+)/['exec'](k);
                                if (s) {
                                    q = s[0x1];
                                    switch ('quiz.' + s[0x2]) {
                                    case 'quiz.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                                    case 'quiz.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                                    case 'quiz.media.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                                    case 'quiz.media.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                                    case 'quiz.media.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                                    case 'quiz.media.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTION_COUNT'];
                                    case 'quiz.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                                    case 'quiz.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                                    case 'quiz.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                                    case 'quiz.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                                    case 'quiz.media.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                                    case 'quiz.media.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                                    }
                                }
                            }
                        }());
                    if (m)
                        return function () {
                            var r = this['get']('data')['quiz'];
                            if (r) {
                                if (!c) {
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, t[u]['id'], m), this);
                                            }
                                        } else
                                            r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, q, m), this);
                                    } else
                                        r['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], g['call'](this, m), this);
                                    c = !![];
                                }
                                try {
                                    var w = 0x0;
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                w += r['getObjective'](t[u]['id'], m);
                                            }
                                        } else
                                            w = r['getObjective'](q, m);
                                    } else {
                                        w = r['get'](m);
                                        if (m == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                            w += 0x1;
                                    }
                                    return w;
                                } catch (x) {
                                    return undefined;
                                }
                            }
                        };
                }
            }
            break;
        }
        return function () {
            return '';
        };
    }
    function e() {
        var k = this['get']('data');
        k['updateText'](k['translateObjs'][a]);
    }
    function f(k) {
        var l = k['data']['nextSelectedIndex'];
        if (l >= 0x0) {
            var m = k['source']['get']('items')[l], n = function () {
                    m['unbind']('begin', n, this), e['call'](this);
                };
            m['bind']('begin', n, this);
        }
    }
    function g(k) {
        return function (l) {
            k in l && e['call'](this);
        }['bind'](this);
    }
    function h(k, l) {
        return function (m, n) {
            k == m && l in n && e['call'](this);
        }['bind'](this);
    }
    function i(k, l, m) {
        for (var n = 0x0; n < k['length']; ++n) {
            var o = k[n], p = o['get']('selectedIndex');
            if (p >= 0x0) {
                var q = l['split']('.'), r = o['get']('items')[p];
                if (m !== undefined && !m['call'](this, r))
                    continue;
                for (var s = 0x0; s < q['length']; ++s) {
                    if (r == undefined)
                        return '';
                    r = 'get' in r ? r['get'](q[s]) : r[q[s]];
                }
                return r;
            }
        }
        return '';
    }
    function j(k, l) {
        var m = l['get']('player');
        return m !== undefined && m['get']('viewerArea') == k;
    }
}
var script = {"class":"Player","start":"this.init()","id":"rootPlayer","layout":"absolute","data":{"history":{},"locales":{"en":"locale/en.txt"},"textToSpeechConfig":{"pitch":1,"speechOnTooltip":false,"speechOnInfoWindow":false,"volume":1,"stopBackgroundAudio":false,"speechOnQuizQuestion":false,"rate":1},"displayTooltipInTouchScreens":true,"name":"Player16949","defaultLocale":"en"},"backgroundColor":["#FFFFFF"],"defaultMenu":["fullscreen","mute","rotation"],"scrollBarColor":"#000000","gap":10,"scripts":{"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"getOverlays":TDV.Tour.Script.getOverlays,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"setLocale":TDV.Tour.Script.setLocale,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"cloneBindings":TDV.Tour.Script.cloneBindings,"showWindow":TDV.Tour.Script.showWindow,"openLink":TDV.Tour.Script.openLink,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"downloadFile":TDV.Tour.Script.downloadFile,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"getComponentByName":TDV.Tour.Script.getComponentByName,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"getPixels":TDV.Tour.Script.getPixels,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"unregisterKey":TDV.Tour.Script.unregisterKey,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"enableVR":TDV.Tour.Script.enableVR,"setValue":TDV.Tour.Script.setValue,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"mixObject":TDV.Tour.Script.mixObject,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"showPopupImage":TDV.Tour.Script.showPopupImage,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"init":TDV.Tour.Script.init,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"registerKey":TDV.Tour.Script.registerKey,"setMapLocation":TDV.Tour.Script.setMapLocation,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"getKey":TDV.Tour.Script.getKey,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"startMeasurement":TDV.Tour.Script.startMeasurement,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"getMainViewer":TDV.Tour.Script.getMainViewer,"disableVR":TDV.Tour.Script.disableVR,"resumePlayers":TDV.Tour.Script.resumePlayers,"initAnalytics":TDV.Tour.Script.initAnalytics,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"playAudioList":TDV.Tour.Script.playAudioList,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"shareSocial":TDV.Tour.Script.shareSocial,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"historyGoForward":TDV.Tour.Script.historyGoForward,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"textToSpeech":TDV.Tour.Script.textToSpeech,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"toggleVR":TDV.Tour.Script.toggleVR,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"clone":TDV.Tour.Script.clone,"getMediaByName":TDV.Tour.Script.getMediaByName,"quizFinish":TDV.Tour.Script.quizFinish,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"quizStart":TDV.Tour.Script.quizStart,"executeJS":TDV.Tour.Script.executeJS,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"historyGoBack":TDV.Tour.Script.historyGoBack,"createTween":TDV.Tour.Script.createTween,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"initQuiz":TDV.Tour.Script.initQuiz,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"translate":TDV.Tour.Script.translate,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"quizShowScore":TDV.Tour.Script.quizShowScore,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"existsKey":TDV.Tour.Script.existsKey,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"isPanorama":TDV.Tour.Script.isPanorama,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia},"backgroundColorRatios":[0],"propagateClick":false,"children":["this.MainViewer"],"width":"100%","minHeight":0,"scrollBarMargin":2,"minWidth":0,"hash": "b65044213cdffde6097b9c2003b44a499bfea6fa5a49bc6a8cff943826899368", "definitions": [{"overlays":["this.overlay_23FC09CC_7E25_9761_41D7_DC6D3C54B36B","this.overlay_229A2035_7E26_9523_41B0_1091CF896F8D"],"data":{"label":"R0010021"},"frames":[{"cube":{"class":"ImageResource","levels":[{"colCount":24,"rowCount":4,"height":2048,"width":12288,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31_0/{face}/0/{row}_{column}.webp"},{"colCount":12,"rowCount":2,"height":1024,"width":6144,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31_0/{face}/1/{row}_{column}.webp"},{"colCount":6,"rowCount":1,"height":512,"width":3072,"class":"TiledImageResourceLevel","tags":["ondemand","preload"],"url":"media/panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31_0/{face}/2/{row}_{column}.webp"}]},"class":"CubicPanoramaFrame","thumbnailUrl":"media/panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31_t.webp"}],"hfov":360,"thumbnailUrl":"media/panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31_t.webp","class":"Panorama","adjacentPanoramas":[{"data":{"overlayID":"overlay_229A2035_7E26_9523_41B0_1091CF896F8D"},"backwardYaw":17.25,"distance":35.93,"class":"AdjacentPanorama","select":"this.overlay_229A2035_7E26_9523_41B0_1091CF896F8D.get('areas').forEach(function(a){ a.trigger('click') })","panorama":"this.panorama_261E177B_7E65_BB27_4197_65033C01FB8C","yaw":73.85},{"data":{"overlayID":"overlay_23FC09CC_7E25_9761_41D7_DC6D3C54B36B"},"backwardYaw":85.89,"distance":12.27,"class":"AdjacentPanorama","select":"this.overlay_23FC09CC_7E25_9761_41D7_DC6D3C54B36B.get('areas').forEach(function(a){ a.trigger('click') })","panorama":"this.panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F","yaw":112.11}],"id":"panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31","vfov":180,"label":trans('panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31.label'),"hfovMin":"150%","hfovMax":130},{"overlays":["this.overlay_23E489C8_7E25_9761_4188_C18268013EB6"],"data":{"label":"R0010046"},"frames":[{"cube":{"class":"ImageResource","levels":[{"colCount":24,"rowCount":4,"height":2048,"width":12288,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F_0/{face}/0/{row}_{column}.webp"},{"colCount":12,"rowCount":2,"height":1024,"width":6144,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F_0/{face}/1/{row}_{column}.webp"},{"colCount":6,"rowCount":1,"height":512,"width":3072,"class":"TiledImageResourceLevel","tags":["ondemand","preload"],"url":"media/panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F_0/{face}/2/{row}_{column}.webp"}]},"class":"CubicPanoramaFrame","thumbnailUrl":"media/panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F_t.webp"}],"hfov":360,"thumbnailUrl":"media/panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F_t.webp","class":"Panorama","adjacentPanoramas":[{"data":{"overlayID":"overlay_23E489C8_7E25_9761_4188_C18268013EB6"},"backwardYaw":112.11,"distance":100,"class":"AdjacentPanorama","select":"this.overlay_23E489C8_7E25_9761_4188_C18268013EB6.get('areas').forEach(function(a){ a.trigger('click') })","panorama":"this.panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31","yaw":85.89}],"id":"panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F","vfov":180,"label":trans('panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F.label'),"hfovMin":"150%","hfovMax":130},{"overlays":["this.overlay_23626036_7E26_9521_41B7_A2711AA06F60"],"data":{"label":"R0010123"},"frames":[{"cube":{"class":"ImageResource","levels":[{"colCount":24,"rowCount":4,"height":2048,"width":12288,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_261E177B_7E65_BB27_4197_65033C01FB8C_0/{face}/0/{row}_{column}.webp"},{"colCount":12,"rowCount":2,"height":1024,"width":6144,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_261E177B_7E65_BB27_4197_65033C01FB8C_0/{face}/1/{row}_{column}.webp"},{"colCount":6,"rowCount":1,"height":512,"width":3072,"class":"TiledImageResourceLevel","tags":["ondemand","preload"],"url":"media/panorama_261E177B_7E65_BB27_4197_65033C01FB8C_0/{face}/2/{row}_{column}.webp"}]},"class":"CubicPanoramaFrame","thumbnailUrl":"media/panorama_261E177B_7E65_BB27_4197_65033C01FB8C_t.webp"}],"hfov":360,"thumbnailUrl":"media/panorama_261E177B_7E65_BB27_4197_65033C01FB8C_t.webp","class":"Panorama","adjacentPanoramas":[{"data":{"overlayID":"overlay_23626036_7E26_9521_41B7_A2711AA06F60"},"backwardYaw":73.85,"distance":11.49,"class":"AdjacentPanorama","select":"this.overlay_23626036_7E26_9521_41B7_A2711AA06F60.get('areas').forEach(function(a){ a.trigger('click') })","panorama":"this.panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31","yaw":17.25}],"id":"panorama_261E177B_7E65_BB27_4197_65033C01FB8C","vfov":180,"label":trans('panorama_261E177B_7E65_BB27_4197_65033C01FB8C.label'),"hfovMin":"150%","hfovMax":130},{"toolTipTextShadowColor":"#000000","toolTipPaddingLeft":6,"progressBarBackgroundColor":["#3399FF"],"class":"ViewerArea","vrPointerSelectionColor":"#FF6600","playbackBarHeadBackgroundColor":["#111111","#666666"],"subtitlesTextShadowOpacity":1,"firstTransitionDuration":0,"vrPointerColor":"#FFFFFF","playbackBarBottom":5,"progressBackgroundColor":["#000000"],"surfaceReticleSelectionColor":"#FFFFFF","subtitlesTextShadowVerticalLength":1,"toolTipPaddingRight":6,"data":{"name":"Main Viewer"},"playbackBarBackgroundColor":["#FFFFFF"],"playbackBarBackgroundOpacity":1,"playbackBarHeight":10,"playbackBarProgressBorderSize":0,"playbackBarBackgroundColorDirection":"vertical","progressBottom":10,"progressHeight":2,"playbackBarHeadWidth":6,"playbackBarProgressBorderRadius":0,"subtitlesFontColor":"#FFFFFF","playbackBarRight":0,"playbackBarProgressBackgroundColor":["#3399FF"],"vrPointerSelectionTime":2000,"subtitlesTop":0,"subtitlesTextShadowColor":"#000000","progressBarBorderRadius":2,"playbackBarHeadShadowOpacity":0.7,"progressBorderSize":0,"progressBarBorderSize":0,"progressBackgroundColorRatios":[0],"subtitlesBottom":50,"progressRight":"33%","subtitlesFontSize":"3vmin","progressBorderRadius":2,"playbackBarProgressBackgroundColorRatios":[0],"subtitlesBackgroundOpacity":0.2,"toolTipBorderColor":"#767676","progressLeft":"33%","subtitlesBorderColor":"#FFFFFF","id":"MainViewer","playbackBarBorderRadius":0,"toolTipFontSize":"1.11vmin","toolTipPaddingBottom":4,"toolTipFontColor":"#606060","playbackBarBorderColor":"#FFFFFF","toolTipPaddingTop":4,"subtitlesTextShadowHorizontalLength":1,"playbackBarHeadShadowBlurRadius":3,"playbackBarProgressBorderColor":"#000000","progressOpacity":0.7,"playbackBarLeft":0,"playbackBarHeadBorderRadius":0,"surfaceReticleColor":"#FFFFFF","subtitlesFontFamily":"Arial","toolTipFontFamily":"Arial","progressBarBackgroundColorDirection":"horizontal","playbackBarHeadBorderColor":"#000000","playbackBarHeadShadowColor":"#000000","propagateClick":false,"playbackBarBorderSize":0,"progressBarBackgroundColorRatios":[0],"playbackBarHeadHeight":15,"playbackBarHeadBackgroundColorRatios":[0,1],"progressBarBorderColor":"#000000","minHeight":50,"width":"100%","toolTipShadowColor":"#333138","playbackBarHeadBorderSize":0,"playbackBarHeadShadow":true,"minWidth":100,"subtitlesBackgroundColor":"#000000","height":"100%","subtitlesGap":0,"progressBorderColor":"#000000","toolTipBackgroundColor":"#F6F6F6"},{"initialPosition":{"pitch":0,"class":"PanoramaCameraPosition","yaw":0},"class":"PanoramaCamera","initialSequence":"this.sequence_2462CD06_7E5E_ACE1_41D6_15F8EB19B178","id":"panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31_camera","enterPointingToHorizon":true},{"initialPosition":{"pitch":0,"class":"PanoramaCameraPosition","yaw":0},"class":"PanoramaCamera","initialSequence":"this.sequence_261765D2_7E65_9F61_41CC_3BD1B98EEA29","id":"panorama_261E177B_7E65_BB27_4197_65033C01FB8C_camera","enterPointingToHorizon":true},{"id":"mainPlayList","items":[{"player":"this.MainViewerPanoramaPlayer","camera":"this.panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F_camera","class":"PanoramaPlayListItem","begin":"this.setEndToItemIndex(this.mainPlayList, 0, 1)","media":"this.panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F"},{"player":"this.MainViewerPanoramaPlayer","camera":"this.panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31_camera","class":"PanoramaPlayListItem","begin":"this.setEndToItemIndex(this.mainPlayList, 1, 2)","media":"this.panorama_246881BC_7E5E_9721_41D7_D5FB29DC7E31"},{"player":"this.MainViewerPanoramaPlayer","begin":"this.setEndToItemIndex(this.mainPlayList, 2, 0)","class":"PanoramaPlayListItem","end":"this.trigger('tourEnded')","camera":"this.panorama_261E177B_7E65_BB27_4197_65033C01FB8C_camera","media":"this.panorama_261E177B_7E65_BB27_4197_65033C01FB8C"}],"class":"PlayList"},{"keepModel3DLoadedWithoutLocation":true,"aaEnabled":true,"displayPlaybackBar":true,"class":"PanoramaPlayer","touchControlMode":"drag_rotation","id":"MainViewerPanoramaPlayer","arrowKeysAction":"translate","mouseControlMode":"drag_rotation","viewerArea":"this.MainViewer"},{"initialPosition":{"pitch":7.9,"class":"PanoramaCameraPosition","yaw":106.08},"class":"PanoramaCamera","initialSequence":"this.sequence_24634D06_7E5E_ACE1_41CF_FA196C1194AB","id":"panorama_253FB443_7E5E_FD67_41CB_EA11F530BB2F_camera","enterPointingToHorizon":true},{"data":{"label":"GoToR0010046","hasPanoramaAction":true},"areas":["this.HotspotPanoramaOverlayArea_235F7F7C_7E26_6B21_41CF_8E98DAC98015"],"enabledInCardboard":true,"maps":[],"class":"HotspotPanoramaOverlay","useHandCursor":true,"id":"overlay_23FC09CC_7E25_9761_41D7_DC6D3C54B36B","items":[{"pitch":-7.88,"distance":50,"yaw":112.11,"data":{"label":"GoToR0010046"},"scaleMode":"fit_inside","image":"this.res_1F160F06_7E22_ACE1_41D7_1EF86A3171AD","vfov":8.88,"class":"HotspotPanoramaOverlayImage","hfov":10.5}]},{"data":{"label":"GoToR0010123","hasPanoramaAction":true},"areas":["this.HotspotPanoramaOverlayArea_230C6043_7E26_9567_41C1_4B010AB02BCF"],"enabledInCardboard":true,"maps":[],"class":"HotspotPanoramaOverlay","useHandCursor":true,"id":"overlay_229A2035_7E26_9523_41B0_1091CF896F8D","items":[{"pitch":-2.7,"distance":50,"yaw":73.85,"data":{"label":"GoToR0010123"},"scaleMode":"fit_inside","image":"this.res_1F160F06_7E22_ACE1_41D7_1EF86A3171AD","vfov":8.88,"class":"HotspotPanoramaOverlayImage","hfov":10.5}]},{"data":{"label":"GoToR0010021"},"areas":["this.HotspotPanoramaOverlayArea_206849E4_7E25_9721_41CE_B4266BAB880C"],"enabledInCardboard":true,"maps":[],"class":"HotspotPanoramaOverlay","useHandCursor":true,"id":"overlay_23E489C8_7E25_9761_4188_C18268013EB6","items":[{"pitch":1.51,"distance":50,"yaw":85.89,"data":{"label":"GoToR0010021"},"scaleMode":"fit_inside","image":"this.res_1F160F06_7E22_ACE1_41D7_1EF86A3171AD","vfov":8.88,"class":"HotspotPanoramaOverlayImage","hfov":10.5}]},{"data":{"label":"GoToR0010021","hasPanoramaAction":true},"areas":["this.HotspotPanoramaOverlayArea_21B8DFE6_7E3E_AB21_41D0_0D587FE9F5AE"],"enabledInCardboard":true,"maps":[],"class":"HotspotPanoramaOverlay","useHandCursor":true,"id":"overlay_23626036_7E26_9521_41B7_A2711AA06F60","items":[{"pitch":-8.4,"distance":50,"yaw":17.25,"data":{"label":"GoToR0010021"},"scaleMode":"fit_inside","image":"this.res_1F160F06_7E22_ACE1_41D7_1EF86A3171AD","vfov":8.88,"class":"HotspotPanoramaOverlayImage","hfov":10.5}]},{"movements":[{"yawDelta":18.5,"easing":"cubic_in","yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"},{"yawDelta":323,"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"},{"yawDelta":18.5,"easing":"cubic_out","yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"}],"class":"PanoramaCameraSequence","id":"sequence_2462CD06_7E5E_ACE1_41D6_15F8EB19B178"},{"movements":[{"yawDelta":18.5,"easing":"cubic_in","yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"},{"yawDelta":323,"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"},{"yawDelta":18.5,"easing":"cubic_out","yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"}],"class":"PanoramaCameraSequence","id":"sequence_261765D2_7E65_9F61_41CC_3BD1B98EEA29"},{"movements":[{"yawDelta":18.5,"easing":"cubic_in","yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"},{"yawDelta":323,"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"},{"yawDelta":18.5,"easing":"cubic_out","yawSpeed":7.96,"class":"DistancePanoramaCameraMovement"}],"class":"PanoramaCameraSequence","id":"sequence_24634D06_7E5E_ACE1_41CF_FA196C1194AB"},{"mapColor":"any","click":"this.setPlayListSelectedIndex(this.mainPlayList, 0)","class":"HotspotPanoramaOverlayArea","id":"HotspotPanoramaOverlayArea_235F7F7C_7E26_6B21_41CF_8E98DAC98015","displayTooltipInTouchScreens":true},{"id":"res_1F160F06_7E22_ACE1_41D7_1EF86A3171AD","levels":[{"height":104,"width":123,"class":"ImageResourceLevel","url":"media/res_1F160F06_7E22_ACE1_41D7_1EF86A3171AD_0.webp"}],"class":"ImageResource"},{"mapColor":"any","click":"this.setPlayListSelectedIndex(this.mainPlayList, 2)","class":"HotspotPanoramaOverlayArea","id":"HotspotPanoramaOverlayArea_230C6043_7E26_9567_41C1_4B010AB02BCF","displayTooltipInTouchScreens":true},{"mapColor":"any","click":"this.setPlayListSelectedIndex(this.mainPlayList, 1)","class":"HotspotPanoramaOverlayArea","id":"HotspotPanoramaOverlayArea_206849E4_7E25_9721_41CE_B4266BAB880C","displayTooltipInTouchScreens":true},{"mapColor":"any","click":"this.setPlayListSelectedIndex(this.mainPlayList, 1)","class":"HotspotPanoramaOverlayArea","id":"HotspotPanoramaOverlayArea_21B8DFE6_7E3E_AB21_41D0_0D587FE9F5AE","displayTooltipInTouchScreens":true}],"height":"100%"};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    var a = {};
    return this['get']('data')['translateObjs'] = translateObjs, a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2025.0.7, Thu Nov 13 2025