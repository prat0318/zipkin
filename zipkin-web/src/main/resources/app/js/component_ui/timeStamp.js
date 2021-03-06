'use strict';

define(
  [
    'flight',
    'moment',
    'bootstrap-datepicker'
  ],

  function (flight, moment, bootstrapDatepicker) {

    return flight.component(timeStamp);

    function timeStamp() {
      this.init = function () {
        this.$timestamp = this.$node.find(".timestamp-value");
        this.$date = this.$node.find(".date-input");
        this.$time = this.$node.find(".time-input");
        var ts = this.$timestamp.val();
        this.setDateTime((ts) ? moment(Number(ts)) : moment());
      }

      this.setDateTime = function(time) {
        this.$date.val(time.format("MM-DD-YYYY"));
        this.$time.val(time.format("HH:mm"));
      }

      this.setTimestamp = function(time) {
        this.$timestamp.val(time.valueOf());
      }

      this.dateChanged = function (e) {
        var time = moment(e.date);
        time.add(moment.duration(this.$time.val()));
        this.setTimestamp(moment.utc(time));
      }

      this.timeChanged = function () {
        var time = moment(this.$date.val(), "MM-DD-YYYY");
        time.add(moment.duration(this.$time.val()));
        this.setTimestamp(moment.utc(time));
      }

      this.after('initialize', function () {
        this.init();
        this.on(this.$time, "change", this.timeChanged);
        this.$date
          .datepicker({format: 'mm-dd-yyyy'})
          .on("changeDate", this.dateChanged.bind(this));
      });
    }
  }
);
