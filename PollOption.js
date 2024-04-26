class PollOption {
    static EVENT_SELECT = 'PollOption.EVENT_SELECT';
    static EVENT_change_counter = 'PollOption.EVENT_change_counter';

    /**
     * @param {JQuery}$context
     */
    constructor($context) {
        this.$context = $context;
        this.$context.find('button').on('click', () => {
            this.$context.trigger(PollOption.EVENT_SELECT, [this.$context.index()]);
        });
    }

    makeDisabled() {
        this.$context.find('button').attr('disabled', true);
    }

    makeUVois() {
        this.$context.addClass('u_vois');
    }

    setCounter(counter, sum_counters) {
        this.$context.find('.counter').text(counter);
        this.updateCountersPct(sum_counters);
        this.$context.trigger(PollOption.EVENT_change_counter);
    }

    getCounter() {
        return parseInt(this.$context.find('.counter').text());
    }

    incrementCounter(sum_counters) {
        let diff = 1;
        this.setCounter(this.getCounter() + diff, sum_counters + diff);
    }

    updateCountersPct(sum_counters) {
        let counter_pct = ((this.getCounter() / sum_counters) * 100).toFixed(2);
        this.$context.find('.counter_pct').text(`${counter_pct}%`);
        this.$context.find('.counter_meter').css('width', `${counter_pct}%`);
    }

    /**
     *
     * @param {jQuery} $parent_context
     * @returns {PollOption[]}
     */
    static create($parent_context) {
        let $options = $parent_context.find('.option');
        let poll_options = [];
        $options.each((index, element) => {
            let $option = $(element);
            poll_options.push(new PollOption($option));
        })
        return poll_options;
    }
}