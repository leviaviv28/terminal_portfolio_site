import React from 'react';
import './Matrix.css'

// Most of this component was written using the GitHub Copilot tool.
class Matrix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matrix: Array(props.length).fill(Array(props.width).fill(''))
        };

        this.fillTopOfMatrix = this.fillTopOfMatrix.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.fillTopOfMatrix();
        }, this.props.speed);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="Matrix">
                {/* Render each line of the matrix with monospace between elements*/}
                {this.state.matrix.map((row, i) => {
                    return (
                        <div key={i} className="Matrix-row">
                            {row.map((col, j) => {
                                return (
                                    <span key={j} className="Matrix-col">
                                        {col ? col : "\u00a0\u00a0"}
                                    </span>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

    fillTopOfMatrix() {
        // Fill random slots in the top row of the matrix with a random number
        const random_row = []
        for (let i = 0; i < this.props.width; i++) {
            // 40% chance to fill slot with a japanese character, otherwise null
            if (Math.random() < 0.4) {
                random_row.push(this.randomJapaneseCharacter())
            } else {
                random_row.push(null)
            }
        }
        // Update the state with the new row, and remove last row
        this.setState({
            matrix: [random_row, ...this.state.matrix.slice(0, -1)]
        })
    }

    randomJapaneseCharacter() {
        // Return a random japanese character
        const japanese_characters = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'
        const random_index = Math.floor(Math.random() * japanese_characters.length)
        return japanese_characters[random_index]
    }
}

export default Matrix;