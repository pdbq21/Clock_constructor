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
                     src={props.clockView.dials.url}
                     alt=""/>
                <img className="hands-view"
                     src={props.clockView.hands.url}
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
    let {dataImagesItems, onClickSelect} = props;
    let listItems = dataImagesItems.map((imageUrl, key) => <ConstructorPanelListItem
        imageUrl={imageUrl}
        onClickSelectItem={onClickSelect}
        className={key}
    />);
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
                }
            },

            clockView: {
                dials: {
                    index: '',
                    url: ''
                },
                hands: {
                    index: '',
                    url: ''
                }
            },

            activeNavigation: true // true - active dials / false - active hands
        };
        this.onClickSelect = this.onClickSelect.bind(this);
        this.onClickNavigation = this.onClickNavigation.bind(this);
    }

    onClickSelect(element) {

        let activeDialIndex = parseInt(this.state.clockView.dials.index),
            activeDial = this.state.clockView.dials.url,
            activeHandIndex = parseInt(this.state.clockView.hands.index),
            activeHand = this.state.clockView.hands.url;
        if (document.getElementById('active-item-vinyl') !== null) {
            document.getElementById('active-item-vinyl').id = '';
        }
        if (this.state.activeNavigation) {

            if (activeDial) {
                document.querySelectorAll('.constructor-panel-list-view .item-vinyl')[activeDialIndex].id = 'active-item-vinyl'
            }

            if (element.target.parentNode.id === 'active-item-vinyl') {
                element.target.parentNode.id = '';
                activeDial = '';
                activeDialIndex = '';
            } else {
                if (document.getElementById('active-item-vinyl') !== null){
                    document.getElementById('active-item-vinyl').id = '';
                }
                element.target.parentNode.id = 'active-item-vinyl';
                activeDialIndex = parseInt(document.querySelector('#active-item-vinyl img').className);
                activeDial = this.state.data.url.dials[activeDialIndex];
            }
        } else {
            if (activeHand) {
                document.querySelectorAll('.constructor-panel-list-view .item-vinyl')[activeHandIndex].id = 'active-item-vinyl'
            }
            if (element.target.parentNode.id === 'active-item-vinyl') {
                element.target.parentNode.id = '';
                activeHand = '';
                activeHandIndex = '';
            } else {
                if (document.getElementById('active-item-vinyl') !== null){
                    document.getElementById('active-item-vinyl').id = '';
                }
                element.target.parentNode.id = 'active-item-vinyl';
                activeHandIndex = parseInt(document.querySelector('#active-item-vinyl img').className);
                activeHand = this.state.data.url.hands[activeHandIndex];
            }
        }

        this.setState({
            clockView: {
                dials: {
                    index: activeDialIndex,
                    url: activeDial,
                },
                hands: {
                    index: activeHandIndex,
                    url: activeHand
                }
            }
        });
    }

    onClickNavigation(element) {

        if (element.target.parentNode.className !== 'navigation active') {
            this.setState({
                activeNavigation: !this.state.activeNavigation
            });
            let elementsNavigation = document.querySelectorAll(".navigation");
            if (document.getElementById('active-item-vinyl')) {
                document.getElementById('active-item-vinyl').id = '';
            }
            if (this.state.activeNavigation) {
                // navigation 0 - dials; 1 - hands;
                elementsNavigation[0].className = 'navigation';
                elementsNavigation[1].className = 'navigation active';
                if (this.state.clockView.hands.url) {
                    document.querySelectorAll('.constructor-panel-list-view .item-vinyl')[this.state.clockView.hands.index].id = 'active-item-vinyl'
                }
            } else {

                elementsNavigation[1].className = 'navigation';
                elementsNavigation[0].className = 'navigation active';
                if (this.state.clockView.dials.url) {
                    document.querySelectorAll('.constructor-panel-list-view .item-vinyl')[this.state.clockView.dials.index].id = 'active-item-vinyl'
                }
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