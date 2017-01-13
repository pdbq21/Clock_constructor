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





class ConstructorPanelBlock extends React.Component{
    render(){
        return (
            <div className="col-sm-4 constructor-panel-block">
                <div className="constructor-panel">
                    <ConstructorPanelNavigation />
                    <ConstructorPanelList />
                </div>
            </div>
        );
    }

}

function ConstructorPanelNavigation() {
    return (
        <ul className="nav nav-tabs nav-justified">
            <li role="presentation" className="active"><a href="#">Циферблати</a></li>
            <li role="presentation"><a href="#">Стрілки</a></li>
        </ul>
    );
}

function ConstructorPanelList() {
    return (
        <div className="constructor-panel-list">

            <div className="col-sm-12 constructor-panel-list-view">

                <ConstructorPanelListItem />

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
    return (
        <div className="col-xs-6 col-md-4">
            <a href="#" className="thumbnail item-vinyl">
                <img
                    src={props.url}
                    alt="..."
                    onClick={props.onClickSelect}
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
                    /*vinyls: ["",
                        "https://lh5.googleusercontent.com/BilGV9eQOu_iNalyYO-feYcBE4FQrVv4mbV4v5XQ_GqOswS1j2-4gfkBiKjrUNrO9qn-7jR7w9RkLA=w1855-h966-rw",
                        "https://lh4.googleusercontent.com/QSxsk5H45Pq3pzDk4YbvXcJFNbZG9n057epHR8ftbbTuCnD_HyOQABBGKa7OPQ5-VwYA8bdPhWliwg=w1855-h966-rw"
                    ],*/

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
            }
        };
        this.onClickSelect = this.onClickSelect.bind(this);
    }

    onClickSelect(element) {

        console.log(element.target.parentNode);

        this.setState({
            data: {
                clockView: element.target.src
            }
        });



    }

    render() {

        return (
            <div className="container constructor">
                <div className="row">
                    <ConstructorContainerBlock clockView={this.state.data.clockView}/>

                    <ConstructorPanelBlock onClickSelect={this.onClickSelect} dataUrl={this.state.data.url} />

                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <ClockConstructor/>
    , document.querySelector('#root-clock-constructor')
);