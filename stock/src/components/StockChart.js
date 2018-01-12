import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView
} from 'react-native';

class StockChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: `
        <!doctype html>
        <html>
        <style media="screen" type="text/css">
          html,body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            // overflow: hidden;
          }
          .chartContainer {
            width:100%;
            height:100%;
            top:0;
            left:0;
            right:0;
            bottom:0;
            position:absolute;
            user-select: none;
            -webkit-user-select: none;
          }
        </style>
        <head>

        <meta charset="utf-8" />
        <meta name="viewport" 
          content="user-scalable=no, 
          width=device-width, initial-scale=1, 
          maximum-scale=1"
        >
        <link rel='stylesheet' href='css/perfect-scrollbar.css' />
        <link rel="stylesheet" type="text/css" href="http://192.168.10.26:8881/css/normalize.css" media="screen" />
        <link rel="stylesheet" type="text/css" href="http://192.168.10.26:8881/css/page-defaults.css" media="screen" />
        <link rel="stylesheet" type="text/css" href="http://192.168.10.26:8881/css/stx-chart.css" media="screen" />
        <link rel="stylesheet" type="text/css" href="http://192.168.10.26:8881/css/chartiq.css" media="screen" />

        </head>

        <body cq-context class="no-touch">
        <cq-ui-manager></cq-ui-manager>

        <div class="ciq-nav">
          <cq-menu class="ciq-search">
            <cq-lookup cq-keystroke-claim cq-keystroke-default>
              <cq-lookup-input cq-no-close>
                <input 
                  id="symbol" 
                  type="text" 
                  spellcheck="off" 
                  autocomplete="off" 
                  autocorrect="off" 
                  autocapitalize="off" 
                  name="symbol" 
                  placeholder="Enter Symbol"
                >
                <cq-lookup-icon></cq-lookup-icon>
              </cq-lookup-input>
              <cq-lookup-results>
                <cq-scroll></cq-scroll>
              </cq-lookup-results>
            </cq-lookup>
          </cq-menu>
        </div>
        <!-- End Navbar -->

        <div class="ciq-chart-area">
          <div class="ciq-chart">
            <div class="chartContainer" id="chartContainer">
              <cq-chart-title cq-marker>
                <cq-symbol></cq-symbol>
                <cq-chart-price>
                  <cq-current-price cq-animate></cq-current-price>
                  <cq-change>
                    <div class="ico"></div>
                    <cq-todays-change></cq-todays-change> (
                    <cq-todays-change-pct></cq-todays-change-pct>)
                  </cq-change>
                </cq-chart-price>
              </cq-chart-title>
              <cq-comparison cq-marker>
                <cq-menu class="cq-comparison-new">
                  <cq-comparison-add-label>
                    <cq-comparison-plus></cq-comparison-plus><span>Compare</span><span>...</span>
                  </cq-comparison-add-label>
                  <cq-comparison-add>
                    <cq-comparison-lookup-frame>
                      <cq-lookup cq-keystroke-claim>
                        <cq-lookup-input cq-no-close>
                          <input 
                            type="text" 
                            cq-focus 
                            spellcheck="off" 
                            autocomplete="off" 
                            autocorrect="off" 
                            autocapitalize="off" 
                            placeholder="Enter Symbol"
                          >
                          <cq-lookup-icon></cq-lookup-icon>
                        </cq-lookup-input>
                          <cq-lookup-results>
                            <cq-scroll></cq-scroll>
                          </cq-lookup-results>
                      </cq-lookup>
                    </cq-comparison-lookup-frame>
                    <cq-swatch cq-no-close></cq-swatch>
                    <span><cq-accept-btn class="stx-btn">ADD</cq-accept-btn></span>
                  </cq-comparison-add>
                </cq-menu>
                <cq-comparison-key>
                  <template cq-comparison-item>
                    <cq-comparison-item>
                      <cq-comparison-swatch></cq-comparison-swatch>
                      <cq-comparison-label>AAPL</cq-comparison-label>
                      <cq-comparison-price cq-animate></cq-comparison-price>
                      <cq-comparison-loader></cq-comparison-loader>
                      <div class="stx-btn-ico ciq-close"></div>
                    </cq-comparison-item>
                  </template>
                </cq-comparison-key>
              </cq-comparison>
              <cq-loader></cq-loader>

            </div>
          </div>
        </div>
        <!-- End Chart Area -->

        <script src="http://192.168.10.26:8881/js/chartiq.js"></script>
        <script src="http://192.168.10.26:8881/js/quoteFeedInflux.js"></script>
        <script src="http://192.168.10.26:8881/js/thirdparty/iscroll.js"></script>
        <script src="http://192.168.10.26:8881/js/thirdparty/object-observe.js"></script>
        <script src="http://192.168.10.26:8881/js/thirdparty/webcomponents-lite.min.js"></script>
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'></script>
        <script src='http://192.168.10.26:8881/js/thirdparty/perfect-scrollbar.jquery.js'></script>
        <script src="http://192.168.10.26:8881/js/componentUI.js"></script>
        <script src="http://192.168.10.26:8881/js/components.js"></script>

        <script>
          var stxx=new CIQ.ChartEngine({container:$("#chartContainer")[0]});

          // connect chart to data
          stxx.attachQuoteFeed(quoteFeedInflux,{refreshInterval:1});

          // used to restore layout on startup
          function restoreLayout(stx, cb){
            var datum=CIQ.localStorage.getItem("myChartLayout");
            if(datum===null) return;
            stx.importLayout(JSON.parse(datum), {managePeriodicity:true, cb: cb});
          }

          //save the chart's layout when the symbol or layout changes
          function saveLayout(obj){
            var s=JSON.stringify(obj.stx.exportLayout(true));
            CIQ.localStorageSetItem("myChartLayout", s);
          }
          stxx.callbacks.layout=saveLayout;
          stxx.callbacks.symbolChange=saveLayout;

          function startUI(){
            UIContext=new CIQ.UI.Context(stxx, $("*[cq-context]"));

            UIContext.changeSymbol=function(data){
              var stx=this.stx;
              if(this.loader) this.loader.show();
              data.symbol=data.symbol.toUpperCase(); // set a pretty display version

              var self=this;
              stx.newChart(data, null, null, function(err){
                if(self.loader) self.loader.hide();
              });
            };


            UIContext.setLookupDriver(new CIQ.UI.Lookup.Driver.ChartIQ());

            UIContext.UISymbolLookup=$(".ciq-search cq-lookup")[0];
            UIContext.UISymbolLookup.setCallback(function(context, data){
              context.changeSymbol(data);
            });

            var KeystrokeHub=new CIQ.UI.KeystrokeHub(
              $("body"), 
              UIContext, 
              {cb:CIQ.UI.KeystrokeHub.defaultHotKeys}
            );

            if(UIContext.loader) UIContext.loader.show();
            restoreLayout(stxx, function(){
              if(UIContext.loader) UIContext.loader.hide();
            });

            if(!stxx.chart.symbol){
              UIContext.UISymbolLookup.selectItem({symbol:"AAPL"}); // load an initial symbol
            }
          }

          function resizeScreen(){
            $('#chartContainer').css('height', $('.ciq-chart').height()+'px');
            stxx.resizeChart();
          }

          window.addEventListener('WebComponentsReady', function(e) {
            startUI();
            resizeScreen();
          });

          $(window).resize(resizeScreen);

        </script>
        </body>
        </html>
      `
    };
  }

  reRenderWebView(e) {
    this.setState({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  }

  render() {
    const concatHTML = this.state.init;
    
    return (
      <View style={this.props.style}>
        <WebView
          onLayout={this.reRenderWebView}
          style={styles.full}
          source={{ html: concatHTML, baseUrl: 'web/' }}
          javaScriptEnabled
          domStorageEnabled
          scalesPageToFit
          scrollEnabled
          automaticallyAdjustContentInsets
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});

export default StockChart;
