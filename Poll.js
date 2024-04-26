class Poll {
    /**
     * @param {JQuery}$context
     */
    constructor($context) {
        this.$context = $context;
        this.poll_options = PollOption.create(this.$context);
        this.poll_options.forEach((poll_options) => {
            poll_options.$context.on(PollOption.EVENT_SELECT, (e, index) => {
                this.select(index);
                this.updateCounterAll(this.getSumCounters());
                this.show_leader(this.getMaxCounter());
            });
            poll_options.$context.on(PollOption.EVENT_change_counter, () => {
                this.poll_options.forEach((poll_options) => {
                    poll_options.updateCountersPct(this.getSumCounters());
                });
            });
        });
    }

    select(index_poll_option) {
        this.show_results();
        this.poll_options.forEach((poll_options) => {
            poll_options.makeDisabled();
        });
        let poll_option = this.poll_options[index_poll_option];
        poll_option.makeUVois();
        poll_option.incrementCounter(this.getSumCounters());
    }

    getSumCounters() {
        let sum_counters = 0;
        this.poll_options.forEach((poll_options) => {
            sum_counters = sum_counters + poll_options.getCounter();
        });
        return sum_counters;
    }

    getMaxCounter() {
        let counters = [];
        this.poll_options.forEach((poll_options, index) => {
            counters[index] = poll_options.getCounter();
        });
        return counters;
    }

    /**
     * @param {array}array
     */
    getMaxIndex(array) {
        let max_index = 0;
        let max_value = 0;
        array.forEach((value, index) => {
            max_index = index;
            max_value = value;
            if (max_value < value) {
                max_value = value;
                max_index = index;
            }
        });
        return max_index;
    }

    show_results() {
        this.$context.addClass('show_results');
    }

    show_leader(counters) {
        $(this.$context.find('.option').get(this.getMaxIndex(counters))).addClass('leader');
    }

    updateCounterAll(sum_counters) {
        this.$context
            .find('.counter_all')
            .text(sum_counters + ' ' + this.declofNum(sum_counters, ['человек', 'человека', 'человек']));
    }

    declofNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    static create() {
        let $polls = $('.b_poll');
        let polls = [];
        $polls.each((index, element) => {
            let $poll = $(element);
            polls.push(new Poll($poll));
        })
        return polls;
    }

}