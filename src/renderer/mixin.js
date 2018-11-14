import moment from 'moment'
export default{
  methods: {
    dateToTimeString (string) {
      return moment(string).format('HH:mm')
    },
    randomRoomId () {
      return this.randomString(10)
    },
    randomString (stringLength) {
      return Math.random().toString(36).slice(-1 * stringLength)
    }
  }
}
