import React from "react";
import "./Terminal.css";
import "./Crt.css"
import Matrix from "./Matrix";

// TODO: Add resume section, about me maybe?, add animation to drawing?

class Terminal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          outputBuffer: [],
          currentCmd: "",
          previousCmds: [],
          previousCmdsIndex: -1,
          currentDir: "/home",
          currentCursorPos: 0,
          isCursorHighlighted: true
        };

        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.addNewOutputToBuffer = this.addNewOutputToBuffer.bind(this);
        this.runCommand = this.runCommand.bind(this);

        this.startCursorBlink = this.startCursorBlink.bind(this);
        this.toggleCursor = this.toggleCursor.bind(this);
        this.moveCursor = this.moveCursor.bind(this);
        

        this.config = {}
        this.user = `visitor@Levi_Portfolio_Site`;
    }

    componentDidMount() {
        fetch('/terminal_portfolio_site/config.json')
        .then((res) => res.json())
        .then(json => this.config = json)
        .then(() => {
            
            this.setState({
                outputBuffer: this.generateWelcomeMessage(),
            });
        });

        this.startCursorBlink()
        document.addEventListener("keydown", this.onKeyPressed)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
                <div className="Crt">
                    <div className="TerminalDiv" tabIndex="0">
                        <span className="outputBufferSpan">
                            {this.state.outputBuffer}
                        </span>
                        <span className="inputSpan" ref={(el) => this.inputLine = el}>
                            {this.renderInputLine()}
                        </span>
                    </div>
                </div>
        );
    }

    startCursorBlink() {
        this.intervalId = setInterval(this.toggleCursor, 350);
    }

    toggleCursor() {
        this.setState({isCursorHighlighted: !this.state.isCursorHighlighted});
    }

    onKeyPressed(event) {
        if (this.inputLine) {
            this.inputLine.scrollIntoView();
        }
        
        if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 186 && event.keyCode <= 192)) {
            const newCommand = this.state.currentCmd.slice(0, this.state.currentCursorPos) + event.key + this.state.currentCmd.slice(this.state.currentCursorPos)
            this.setState({currentCmd: newCommand}, () => this.moveCursor(1));
        }
        else if (event.keyCode === 8) { // Backspace
            if (this.state.currentCursorPos > 0) {
                const newCommand = this.state.currentCmd.slice(0, this.state.currentCursorPos - 1) + this.state.currentCmd.slice(this.state.currentCursorPos)
                this.setState({currentCmd: newCommand}, () => this.moveCursor(-1));
            }
        }
        else if (event.keyCode === 46) { // Delete
            if (this.state.currentCursorPos < this.state.currentCmd.length) {
                const newCommand = this.state.currentCmd.slice(0, this.state.currentCursorPos) + this.state.currentCmd.slice(this.state.currentCursorPos + 1)
                this.setState({currentCmd: newCommand}, () => this.moveCursor(-1));
            }
        }
        else if (event.keyCode === 13) { // Enter 
            const result = this.runCommand();
            this.addNewOutputToBuffer(result);
            if (this.state.currentCmd) {
                this.setState({
                    previousCmds: [this.state.currentCmd].concat(this.state.previousCmds),
                    previousCmdsIndex: -1
                });
            }
            this.setState({
                currentCmd: '',
                currentCursorPos: 0,
            });

            if (this.inputLine) {
                this.inputLine.scrollIntoView({behavior: 'smooth'});
            }
        }
        else if (event.keyCode === 37) {
            this.moveCursor(-1);
        }
        else if (event.keyCode === 38) {
            event.preventDefault()
            if (this.state.previousCmdsIndex < this.state.previousCmds.length - 1 && this.state.previousCmds.length > 0) {
                this.setState({
                    previousCmdsIndex: this.state.previousCmdsIndex + 1,
                    currentCmd: this.state.previousCmds[this.state.previousCmdsIndex + 1]
                })
                console.log(this.state.previousCmds)
                console.log(this.state.previousCmdsIndex)
            }
        }
        else if (event.keyCode === 39) {
            this.moveCursor(1);
        }
        else if (event.keyCode === 40) {
            event.preventDefault()
            if (this.state.previousCmdsIndex > 0) {
                this.setState({
                    previousCmdsIndex: this.state.previousCmdsIndex - 1,
                    currentCmd: this.state.previousCmds[this.state.previousCmdsIndex - 1]
                })
            }
            else {
                this.setState({
                    previousCmdsIndex: -1,
                    currentCmd: ' '
                })
            }
            console.log(this.state.previousCmds)
            console.log(this.state.previousCmdsIndex)
        } 
    }

    moveCursor(direction) {
        let newCursorPos = this.state.currentCursorPos + direction;

        if (newCursorPos < 0) {
            newCursorPos = 0;
        }
        else if (newCursorPos > this.state.currentCmd.length) {
            newCursorPos = this.state.currentCmd.length;
        }

        this.setState({
            currentCursorPos: newCursorPos,
            isCursorHighlighted: true
        });
        
    }

    addNewOutputToBuffer(cmdOutput) {
        const newOutput = <div>
                <p >{`${this.user}:${this.state.currentDir}$ ${this.state.currentCmd}`}</p>
                <div className="CommandOutput">{cmdOutput}</div>
            </div>
        this.setState({
            outputBuffer: this.state.outputBuffer.concat([newOutput]),
        })
    }

    renderInputLine() {
        const cursorStyle = this.state.isCursorHighlighted ? "CursorActive" : "CursorInactive";

        const prefix = `${this.user}:${this.state.currentDir}$`;
        
        const preCursor = this.state.currentCmd.slice(0, this.state.currentCursorPos);
        const cursor = <span className={cursorStyle}>{this.state.currentCmd[this.state.currentCursorPos] ?? " "}</span>
        const postCursor = this.state.currentCmd.slice(this.state.currentCursorPos + 1, this.state.currentCmd.length);
        
        return (
            <div>{prefix} {preCursor}{cursor}{postCursor}</div>
        );
    }

    runCommand() {
        switch (this.state.currentCmd.trim()) {
            case 'welcome':
                return this.generateWelcomeMessage();
            case 'socials':
                return this.generateSocials();
            case 'resume':
                return this.displayResume();
            case 'clear':
                this.setState({outputBuffer: []});
                return this.generateWelcomeMessage();
            case 'matrix':
                return (<Matrix length={25} width={30} speed={30}/>);
            case '':
                return ''
            default:
                return `Command: ${this.state.currentCmd} is not recognized by the system.`
        }
    }

    generateWelcomeMessage() {
        const welcomeMsg = this.config.welcome.split('\n')
        welcomeMsg[0] = <h1>{welcomeMsg[0]}</h1>
        welcomeMsg[welcomeMsg.length - 1] = <h3>{welcomeMsg[welcomeMsg.length - 1]}</h3>
        
        const commands = this.config.commands.map((cmd, index) => <li key={`welcome_${index}`}><b onClick={this.commandClicked}>{cmd.name}</b>: {cmd.description}</li>);
        
        return welcomeMsg.concat(commands);
    }

    generateSocials() {
        return this.config.socials.map(social => {
            return <li>
                        <h3>{social.name}</h3>
                        <a href={social.url}>{social.url}</a>
                    </li>
        })
    }

    displayResume() {
        return (
            <div className="Resume">
                <h1 className="ResumeHeader">{this.config.resume.header}</h1>
                <h2 className="ResumeHeader">Skills and Abilities</h2>
                {this.config.resume.skills.map((line) => <li className="ResumeList">{line}</li>)}
                <h2 className="ResumeHeader">Professional Experience</h2>
                {this.config.resume.experience.map((experience) => {
                    return (
                        <div className="ResumeItem">
                            <h3 className="ResumeHeader">{experience.title} @ {experience.company}</h3>
                            <h4>{experience.location}; {experience.duration}</h4>
                            {experience.responsibilities.map((resp) => <li className="ResumeList">{resp}</li>)}
                        </div>
                    );
                })}  
            </div>
        )
    }
}

export default Terminal