(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{14:function(e,t,s){},15:function(e,t,s){},16:function(e,t,s){},17:function(e,t,s){},19:function(e,t,s){"use strict";s.r(t);var r=s(2),n=s.n(r),i=s(8),a=s.n(i),o=(s(14),s(3)),u=s(4),c=s(1),l=s(6),h=s(5),d=(s(15),s(16),s(9)),m=(s(17),s(0)),C=function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(e){var r;return Object(o.a)(this,s),(r=t.call(this,e)).state={matrix:Array(e.length).fill(Array(e.width).fill(""))},r.fillTopOfMatrix=r.fillTopOfMatrix.bind(Object(c.a)(r)),r}return Object(u.a)(s,[{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval((function(){e.fillTopOfMatrix()}),this.props.speed)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){return Object(m.jsx)("div",{className:"Matrix",children:this.state.matrix.map((function(e,t){return Object(m.jsx)("div",{className:"Matrix-row",children:e.map((function(e,t){return Object(m.jsx)("span",{className:"Matrix-col",children:e||"\xa0\xa0"},t)}))},t)}))})}},{key:"fillTopOfMatrix",value:function(){for(var e=[],t=0;t<this.props.width;t++)Math.random()<.4?e.push(this.randomJapaneseCharacter()):e.push(null);this.setState({matrix:[e].concat(Object(d.a)(this.state.matrix.slice(0,-1)))})}},{key:"randomJapaneseCharacter",value:function(){var e="\u3042\u3044\u3046\u3048\u304a\u304b\u304d\u304f\u3051\u3053\u3055\u3057\u3059\u305b\u305d\u305f\u3061\u3064\u3066\u3068\u306a\u306b\u306c\u306d\u306e\u306f\u3072\u3075\u3078\u307b\u307e\u307f\u3080\u3081\u3082\u3084\u3086\u3088\u3089\u308a\u308b\u308c\u308d\u308f\u3092\u3093";return e[Math.floor(Math.random()*e.length)]}}]),s}(n.a.Component),f=function(e){Object(l.a)(s,e);var t=Object(h.a)(s);function s(e){var r;return Object(o.a)(this,s),(r=t.call(this,e)).state={outputBuffer:[],currentCmd:"",previousCmds:[],previousCmdsIndex:-1,currentDir:"/home",currentCursorPos:0,isCursorHighlighted:!0},r.onKeyPressed=r.onKeyPressed.bind(Object(c.a)(r)),r.addNewOutputToBuffer=r.addNewOutputToBuffer.bind(Object(c.a)(r)),r.runCommand=r.runCommand.bind(Object(c.a)(r)),r.startCursorBlink=r.startCursorBlink.bind(Object(c.a)(r)),r.toggleCursor=r.toggleCursor.bind(Object(c.a)(r)),r.moveCursor=r.moveCursor.bind(Object(c.a)(r)),r.config={},r.user="visitor@Levi_Portfolio_Site",r}return Object(u.a)(s,[{key:"componentDidMount",value:function(){var e=this;fetch("/terminal_portfolio_site/config.json").then((function(e){return e.json()})).then((function(t){return e.config=t})).then((function(){e.setState({outputBuffer:e.generateWelcomeMessage()})})),this.startCursorBlink(),document.addEventListener("keydown",this.onKeyPressed)}},{key:"componentWillUnmount",value:function(){clearInterval(this.intervalID)}},{key:"render",value:function(){var e=this;return Object(m.jsx)("div",{className:"Crt",children:Object(m.jsxs)("div",{className:"TerminalDiv",tabIndex:"0",children:[Object(m.jsx)("span",{className:"outputBufferSpan",children:this.state.outputBuffer}),Object(m.jsx)("span",{className:"inputSpan",ref:function(t){return e.inputLine=t},children:this.renderInputLine()})]})})}},{key:"startCursorBlink",value:function(){this.intervalId=setInterval(this.toggleCursor,350)}},{key:"toggleCursor",value:function(){this.setState({isCursorHighlighted:!this.state.isCursorHighlighted})}},{key:"onKeyPressed",value:function(e){var t=this;if(this.inputLine&&this.inputLine.scrollIntoView(),e.keyCode>=65&&e.keyCode<=90||e.keyCode>=48&&e.keyCode<=57||e.keyCode>=186&&e.keyCode<=192){var s=this.state.currentCmd.slice(0,this.state.currentCursorPos)+e.key+this.state.currentCmd.slice(this.state.currentCursorPos);this.setState({currentCmd:s},(function(){return t.moveCursor(1)}))}else if(8===e.keyCode){if(this.state.currentCursorPos>0){var r=this.state.currentCmd.slice(0,this.state.currentCursorPos-1)+this.state.currentCmd.slice(this.state.currentCursorPos);this.setState({currentCmd:r},(function(){return t.moveCursor(-1)}))}}else if(46===e.keyCode){if(this.state.currentCursorPos<this.state.currentCmd.length){var n=this.state.currentCmd.slice(0,this.state.currentCursorPos)+this.state.currentCmd.slice(this.state.currentCursorPos+1);this.setState({currentCmd:n},(function(){return t.moveCursor(-1)}))}}else if(13===e.keyCode){var i=this.runCommand();this.addNewOutputToBuffer(i),this.state.currentCmd&&this.setState({previousCmds:[this.state.currentCmd].concat(this.state.previousCmds),previousCmdsIndex:-1}),this.setState({currentCmd:"",currentCursorPos:0}),this.inputLine&&this.inputLine.scrollIntoView({behavior:"smooth"})}else 37===e.keyCode?this.moveCursor(-1):38===e.keyCode?(e.preventDefault(),this.state.previousCmdsIndex<this.state.previousCmds.length-1&&this.state.previousCmds.length>0&&(this.setState({previousCmdsIndex:this.state.previousCmdsIndex+1,currentCmd:this.state.previousCmds[this.state.previousCmdsIndex+1]}),console.log(this.state.previousCmds),console.log(this.state.previousCmdsIndex))):39===e.keyCode?this.moveCursor(1):40===e.keyCode&&(e.preventDefault(),this.state.previousCmdsIndex>0?this.setState({previousCmdsIndex:this.state.previousCmdsIndex-1,currentCmd:this.state.previousCmds[this.state.previousCmdsIndex-1]}):this.setState({previousCmdsIndex:-1,currentCmd:" "}),console.log(this.state.previousCmds),console.log(this.state.previousCmdsIndex))}},{key:"moveCursor",value:function(e){var t=this.state.currentCursorPos+e;t<0?t=0:t>this.state.currentCmd.length&&(t=this.state.currentCmd.length),this.setState({currentCursorPos:t,isCursorHighlighted:!0})}},{key:"addNewOutputToBuffer",value:function(e){var t=Object(m.jsxs)("div",{children:[Object(m.jsx)("p",{children:"".concat(this.user,":").concat(this.state.currentDir,"$ ").concat(this.state.currentCmd)}),Object(m.jsx)("div",{className:"CommandOutput",children:e})]});this.setState({outputBuffer:this.state.outputBuffer.concat([t])})}},{key:"renderInputLine",value:function(){var e,t=this.state.isCursorHighlighted?"CursorActive":"CursorInactive",s="".concat(this.user,":").concat(this.state.currentDir,"$"),r=this.state.currentCmd.slice(0,this.state.currentCursorPos),n=Object(m.jsx)("span",{className:t,children:null!==(e=this.state.currentCmd[this.state.currentCursorPos])&&void 0!==e?e:" "}),i=this.state.currentCmd.slice(this.state.currentCursorPos+1,this.state.currentCmd.length);return Object(m.jsxs)("div",{children:[s," ",r,n,i]})}},{key:"runCommand",value:function(){switch(this.state.currentCmd.trim()){case"welcome":return this.generateWelcomeMessage();case"socials":return this.generateSocials();case"resume":return this.displayResume();case"clear":return this.setState({outputBuffer:[]}),this.generateWelcomeMessage();case"matrix":return Object(m.jsx)(C,{length:25,width:30,speed:30});case"":return"";default:return"Command: ".concat(this.state.currentCmd," is not recognized by the system.")}}},{key:"generateWelcomeMessage",value:function(){var e=this,t=this.config.welcome.split("\n");t[0]=Object(m.jsx)("h1",{children:t[0]}),t[t.length-1]=Object(m.jsx)("h3",{children:t[t.length-1]});var s=this.config.commands.map((function(t,s){return Object(m.jsxs)("li",{children:[Object(m.jsx)("b",{onClick:e.commandClicked,children:t.name}),": ",t.description]},"welcome_".concat(s))}));return t.concat(s)}},{key:"generateSocials",value:function(){return this.config.socials.map((function(e){return Object(m.jsxs)("li",{children:[Object(m.jsx)("h3",{children:e.name}),Object(m.jsx)("a",{href:e.url,children:e.url})]})}))}},{key:"displayResume",value:function(){return Object(m.jsxs)("div",{className:"Resume",children:[Object(m.jsx)("h1",{className:"ResumeHeader",children:this.config.resume.header}),Object(m.jsx)("h2",{className:"ResumeHeader",children:"Skills and Abilities"}),this.config.resume.skills.map((function(e){return Object(m.jsx)("li",{className:"ResumeList",children:e})})),Object(m.jsx)("h2",{className:"ResumeHeader",children:"Professional Experience"}),this.config.resume.experience.map((function(e){return Object(m.jsxs)("div",{className:"ResumeItem",children:[Object(m.jsxs)("h3",{className:"ResumeHeader",children:[e.title," @ ",e.company]}),Object(m.jsxs)("h4",{children:[e.location,"; ",e.duration]}),e.responsibilities.map((function(e){return Object(m.jsx)("li",{className:"ResumeList",children:e})}))]})}))]})}}]),s}(n.a.Component),v=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,20)).then((function(t){var s=t.getCLS,r=t.getFID,n=t.getFCP,i=t.getLCP,a=t.getTTFB;s(e),r(e),n(e),i(e),a(e)}))};a.a.render(Object(m.jsx)(n.a.StrictMode,{children:Object(m.jsx)(f,{})}),document.getElementById("root")),v()}},[[19,1,2]]]);
//# sourceMappingURL=main.d384d45f.chunk.js.map