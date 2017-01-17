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
                     src="../src/images/1.png"
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


function ConstructorPanelBlock(props) {
    return (
        <div className="constructor-panel">
            <ConstructorPanelNavigation
                onClickNavigation={props.onClickNavigation}
            />
            <ConstructorPanelList
                dataImagesItems={props.dataImagesUrl}
                onClickSelect={props.onClickSelect}
                dialsOrHands={props.dialsOrHands}
            />
        </div>
    );
}

function ConstructorPanelNavigation(props) {
    return (
        <ul className="nav nav-tabs nav-justified" onClick={props.onClickNavigation}>
            <li role="presentation" className="navigation active"><a href="#">Циферблати</a></li>
            <li role="presentation" className="navigation"><a href="#">Стрілки</a></li>
        </ul>
    );
}

function ConstructorPanelList(props) {
    let {dataImagesItems, onClickSelect, dialsOrHands} = props;
    let listItems;
    if (dialsOrHands === 'dials'){
        listItems = dataImagesItems.map((imageUrl, key) => <ConstructorPanelListItemDials
            imageUrl={imageUrl}
            onClickSelectItem={onClickSelect}
            className={key}
        />);
    } else{
        listItems = dataImagesItems.map((imageUrl, key) => <ConstructorPanelListItemHands
            imageUrl={imageUrl}
            onClickSelectItem={onClickSelect}
            className={key}
        />);
    }

    return (
        <div className="constructor-panel-list">

            <div className="col-sm-12 constructor-panel-list-view">
                {listItems}
            </div>

            <div className="col-sm-12 ">
                <button type="button" className="btn btn-success ">
                    Готово
                </button>
            </div>

        </div>
    );
}

function ConstructorPanelListItemDials(props) {
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

function ConstructorPanelListItemHands(props) {
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

                }
            },

            clockView: {
                dials: "",
                hands: ""
            },

            activeNavigation: true // true - active dials / false - active hands
        };
        this.onClickSelect = this.onClickSelect.bind(this);
        this.onClickNavigation = this.onClickNavigation.bind(this);
    }

    onClickSelect(element) {

        let activeDialKey = '',
            activeDial = this.state.clockView.dials,
            activeHandKey = '',
            activeHand = this.state.clockView.hands;

        if (this.state.activeNavigation) {
            if (element.target.parentNode.id === "active-dials") {
                element.target.parentNode.id = '';
                activeDial = '';
            } else {
                if (document.querySelector('#active-dials')) {
                    document.querySelector('#active-dials').id = '';
                }
                element.target.parentNode.id = "active-dials";
                activeDialKey = parseInt(document.querySelector("#active-dials img").className);
                activeDial = this.state.data.url.dials[activeDialKey];
            }

        } else {
            if (element.target.parentNode.id === "active-hands") {
                element.target.parentNode.id = "";
                activeHand = '';
            } else {
                if (document.querySelector('#active-hands')) {
                    document.querySelector('#active-hands').id = "";
                }
                element.target.parentNode.id = "active-hands";
                activeHandKey = parseInt(document.querySelector("#active-hands img").className);
                activeHand = this.state.data.url.hands[activeHandKey];
            }
        }

        this.setState({
            clockView: {
                dials: activeDial,
                hands: activeHand
            }
        });
    }

    onClickNavigation(element) {

        if (element.target.parentNode.className !== 'navigation active') {
            this.setState({
                activeNavigation: !this.state.activeNavigation
            });
            let elementsNavigation = document.querySelectorAll(".navigation");
            if (this.state.activeNavigation) {
                // navigation 0 - dials; 1 - hands;
                elementsNavigation[0].className = 'navigation';
                elementsNavigation[1].className = 'navigation active';
            } else {
                elementsNavigation[1].className = 'navigation';
                elementsNavigation[0].className = 'navigation active';
            }
        }
    }

    render() {

        return (
            <div className="container constructor">
                <div className="row">
                    <ConstructorContainerBlock
                        clockView={this.state.clockView}
                    />
                    <div className="col-sm-4 constructor-panel-block">
                        <ConstructorPanelBlock
                            onClickSelect={this.onClickSelect}
                            onClickNavigation={this.onClickNavigation}
                            dataImagesUrl={(this.state.activeNavigation) ?
                                this.state.data.url.dials : this.state.data.url.hands}
                            dialsOrHands={(this.state.activeNavigation) ?
                                'dials' : 'hands'}
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