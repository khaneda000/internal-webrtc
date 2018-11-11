import moment from 'moment'
export default{
  methods: {
    dateToTimeString (string) {
      return moment(string).format('HH:mm')
    }
  }
}
