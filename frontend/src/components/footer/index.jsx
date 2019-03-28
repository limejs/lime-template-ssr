import './style'

export default {
  data() {
    return {
      year: `2016-${(new Date()).getFullYear()}`
    }
  },
  render() {
    return (
      <div class="footer l-box is-center">
      腾讯科技 &copy;{this.year} All Rights Reserved.
      </div>
    )
  }
}
