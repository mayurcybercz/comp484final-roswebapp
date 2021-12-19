import React, { Component, useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';

class SpeechCommand extends Component {
    
    constructor(){
        super(); 
    }

    componentDidMount() {
        this.alanBtnInstance = alanBtn({
          key: '9417ab116ddc481d13fccf19e29f13222e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: (commandData) => {
            if (commandData.command === 'go:back') {
              alert('This code was executed');
            }
          },
        });
    }

    render(){
        return(
           <div>
           </div> 
        );
    }
}

export default SpeechCommand;