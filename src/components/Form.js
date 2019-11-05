import React from 'react'
import './styles/Form.css'


class Form extends React.Component {

  state = {
    suggestions: [],
    text: '',
    nodeList: ''
    // prevLength: '',
    // currentLength: ''   /* sur la piste pour stopper affichage en cas de suppression de cara ds search field*/
  }
  componentDidUpdate() {
    console.log('je viens de m\'update')
    if (this.renderSuggestions()) {
      console.log('je viens de m\'update car renderSuggestions() a été appelé')
      const lis = document.querySelectorAll('li')
      console.log('querySelectorAll renvoie : ', lis)
    }
  }


  onTextChanged = (e) => {
    const value = e.target.value.replace(RegExp(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/), '')
    let suggestions = [] /* ici si const plutôt que let alors ne pourra pas modifier array, aboutissant à une erreur */
    if (value.length > 0) {
      const array = this.props.data /* stock data dans const */
      const regex = new RegExp(`^${value}`, 'i')
      suggestions = array.sort().filter(v => regex.test(v.name)) /* tester par rapport à name */
    }
    this.setState(prev => ({ suggestions, text: value, prevLength: prev.currentLength, currentLength: value.length }))/* !!! + sur la piste pour stopper affichage en cas de suppression de cara ds search field*/
    console.log(`suggestions devant être rendues : `, suggestions)
    console.log(`state après setState avec suggestions : `, this.state.suggestions)

  }

  renderSuggestions = () => {
    console.log(`renderSuggestions called, state supposé être identique à state après setState ci-dessus : `, this.state.suggestions)
    const { suggestions } = this.state /* !!! => semble que permet de ne pas
    constamment écrire this.state.suggestions, à vérifier */
    if (suggestions.length === 0) {
      return null
    }
    return (
      <ul>
        {suggestions.map((item, index) => <li className='house'/* !!! possibilité de mettre onClick direct ici */ key={index}>{item.name} {index}</li>)} {/* render l'info souhaitée, ici name  style={this.state.prevLength < this.state.currentLength ? { animationDelay: `${index}s`, animationDuration: `1s`, animationName: 'start' } : { animationName: '' }}*/}
      </ul>
    )
  }

  render() {
    const { text } = this.state
    // console.log('current length : ', this.state.currentLength, 'prev length : ', this.state.prevLength)

    return (
      <div>
        {this.props.data && <img src={this.props.data[0].head_shot} />}
        <input value={text} onChange={this.onTextChanged}></input>
        {this.renderSuggestions()} {/* intéressant de voir que possible
        d'appeler function dans render sans répondre forcément à un event */}
        {/* {this.renderSuggestions() && this.test()} */}

        {/* {this.test() && console.log('youyououououououou')} */}
        <p>pic du cara en court de passage</p>
      </div>
    )
  }
}

export default Form