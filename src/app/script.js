/**
 * Created by ruslan on 11.01.17.
 */

import React from 'react'
import ReactDOM from 'react-dom'

function ConstructorContainerBlock(props) {
    return (
        <div className="col-sm-8 constructor-container-block">

            <div className="constructor-container center-block">

                <img className="vinyl-view"
                    src={props.clockView.vinyls}
                    alt=""/>
                <img className="dial-view"
                    src={props.clockView.dials}
                    alt=""/>
                <img className="hands-view"
                    src={props.clockView.hands}
                    alt=""/>
            </div>
        </div>
    );
}







/* left block for construction */





function ConstructorPanelBlock(props){
            return (
                <div className="constructor-panel">
                    <ConstructorPanelNavigation
                        onClickNavigation={props.onClickNavigation}
                    />
                    <ConstructorPanelList
                        dataImagesItems={props.dataImagesUrl}
                        onClickSelect={props.onClickSelect}
                    />
                </div>
        );
}

function ConstructorPanelNavigation(props) {
    return (
        <ul className="nav nav-tabs nav-justified" onClick={props.onClickNavigation}>
            <li role="presentation" className="navigation active"><a href="#" >Циферблати</a></li>
            <li role="presentation" className="navigation"><a href="#">Стрілки</a></li>
        </ul>
    );
}

function ConstructorPanelList(props) {
    let {dataImagesItems, onClickSelect} = props;
    return (
        <div className="constructor-panel-list">

            <div className="col-sm-12 constructor-panel-list-view" >

                {dataImagesItems.map((imageUrl, key) => <ConstructorPanelListItem
                    imageUrl={imageUrl}
                    onClickSelectItem={onClickSelect}
                    className={key}
                />)}


            </div>

            <div className="col-sm-12 ">
                <button type="button" className="btn btn-success ">
                    Готово
                </button>
            </div>

        </div>
    );
}

function ConstructorPanelListItem(props) {
    let {imageUrl, onClickSelectItem, className} = props;
    return (
        <div className="col-xs-6 col-md-4">
            <a href="#" className="thumbnail item-vinyl">
                <img
                    src={imageUrl}
                    alt="..."
                    onClick={onClickSelectItem}
                    className={className}
                    id=""
                />

            </a>
        </div>
    );
}
/* Root App Component */

class ClockConstructor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                url: {
                    dials: [
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk1_WLO5a0T_txKnNeV4HIN_-_BiGiS8qLwAKTamqwQarWfWxOeA",
                        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTiw_LCy5zSQBIttIJpydFwN0uWuBys-iIMoI8Z0_K4bUoJWfF5",
                        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSJPojTE0t0_BWauA9w7SfXhTvtAfDI9vkBteVTIRA9U0hLCJFb",
                        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT5b9BCpzLQujYx83B9H2D_m3E9cJFmWn4Mo3VZOIL3i32m5sH0",
                        "http://www.clipartbest.com/cliparts/4Tb/4Ao/4Tb4AoGEc.png"
                    ],
                    hands: [
                        "../src/images/h1.png",
                        "../src/images/h2.png",
                        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRt3UdEXolFOr8qCZmAMNtgdqAgdvcP-x1mbydOXi285dHh_WSo",
                        "http://www.electrictime.com/wp-content/themes/etime-canvas/dial-hands/images/hand_AS.gif",
                        "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=55428835",
                    ],

                },
                clockView: {
                    vinyls: "../src/images/1.png",
                    dials: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk1_WLO5a0T_txKnNeV4HIN_-_BiGiS8qLwAKTamqwQarWfWxOeA",
                    hands: "../src/images/h1.png"
                }
            },
            activeNavigation: true // true - active dials / false - active hands
        };
        this.onClickSelect = this.onClickSelect.bind(this);
        this.onClickNavigation = this.onClickNavigation.bind(this);
    }

    onClickSelect(element) {

        let activeDialKey,
            activeDial,
            activeHandKey,
            activeHand;
        if (this.state.activeNavigation){
            if ( element.target.id === "active-dials"){
                element.target.id = "";
            }else{
                if (document.querySelector('#active-dials')){
                    document.querySelector('#active-dials').id="";
                }
                element.target.id = "active-dials";
                activeDialKey = parseInt(document.querySelector("#active-dials").className);
            }
        }else{
            if ( element.target.id === "active-hands"){
                element.target.id = "";
            }else{
                if (document.querySelector('#active-hands')){
                    document.querySelector('#active-hands').id="";
                }
                element.target.id = "active-hands";
                activeHandKey = parseInt(document.getElementById("active-hands").className);
            }
        }

        activeDial = this.state.data.url.dials[activeDialKey];
        activeHand = this.state.data.url.hands[activeHandKey];
       // element.target.id = `active-${(this.state.activeNavigation)? 'dials' : 'hands'}`;

        this.setState({
            data: {
                clockView: {
                    dials: activeDial,
                    hands: activeHand
                }
            }
        });
    }

    onClickNavigation(){
        this.setState({
            activeNavigation: !this.state.activeNavigation
        });

       let elementsNavigation = document.querySelectorAll(".navigation");
       if (this.state.activeNavigation){
           // navigation 0 - dials; 1 - hands;
           elementsNavigation[0].className = 'navigation';
           elementsNavigation[1].className = 'navigation active';
       }else{
           elementsNavigation[1].className = 'navigation';
           elementsNavigation[0].className = 'navigation active';
       }

    }



    render() {

        return (
            <div className="container constructor">
                <div className="row">
                    <ConstructorContainerBlock
                        clockView={this.state.data.clockView}
                    />
                    <div className="col-sm-4 constructor-panel-block">
                        <ConstructorPanelBlock
                            onClickSelect={this.onClickSelect}
                            onClickNavigation={this.onClickNavigation}
                            dataImagesUrl={(this.state.activeNavigation)?
                                this.state.data.url.dials : this.state.data.url.hands}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <ClockConstructor/>, document.querySelector('#root-clock-constructor')
);