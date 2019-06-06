import React from 'react';
import * as PropTypes from "prop-types";
import omit from "lodash/omit.js";
import {DayPickerRangeController,} from "react-dates";
import {forbidExtraProps} from "airbnb-prop-types";
import momentPropTypes from "react-moment-proptypes";
// import isInclusivelyAfterDay from "react-dates/src/utils/isInclusivelyAfterDay.js";
import {END_DATE, START_DATE, HORIZONTAL_ORIENTATION} from "react-dates/src/constants.js";
import ScrollableOrientationShape from "react-dates/src/shapes/ScrollableOrientationShape.js";


const propTypes = forbidExtraProps({
    // example props for the demo
    autoFocusEndDate: PropTypes.bool,
    initialStartDate: momentPropTypes.momentObj,
    initialEndDate: momentPropTypes.momentObj,
    startDate: momentPropTypes.momentObj,
    endDate: momentPropTypes.momentObj,
    startDateOffset: PropTypes.func,
    endDateOffset: PropTypes.func,
    showInputs: PropTypes.bool,
    minDate: momentPropTypes.momentObj,
    maxDate: momentPropTypes.momentObj,

    keepOpenOnDateSelect: PropTypes.bool,
    minimumNights: PropTypes.number,
    isOutsideRange: PropTypes.func,
    isDayBlocked: PropTypes.func,
    isDayHighlighted: PropTypes.func,

    // DayPicker props
    enableOutsideDays: PropTypes.bool,
    numberOfMonths: PropTypes.number,
    orientation: ScrollableOrientationShape,
    verticalHeight: PropTypes.number,
    withPortal: PropTypes.bool,
    initialVisibleMonth: PropTypes.func,
    renderCalendarInfo: PropTypes.func,
    renderMonthElement: PropTypes.func,
    renderMonthText: PropTypes.func,

    navPrev: PropTypes.node,
    navNext: PropTypes.node,

    onPrevMonthClick: PropTypes.func,
    onNextMonthClick: PropTypes.func,
    onOutsideClick: PropTypes.func,
    renderCalendarDay: PropTypes.func,
    renderDayContents: PropTypes.func,
    // renderKeyboardShortcutsButton: PropTypes.func,

    // i18n
    monthFormat: PropTypes.string,

    isRTL: PropTypes.bool,

    onDatesUpdate: PropTypes.func,
});

const defaultProps = {
    // example props for the demo
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,
    startDateOffset: undefined,
    endDateOffset: undefined,
    showInputs: false,
    // minDate: null,
    // maxDate: null,

    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    minimumNights: 1,
    isDayBlocked: () => false,
    // isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,
    enableOutsideDays: false,

    // calendar presentation and interaction related props
    orientation: HORIZONTAL_ORIENTATION,
    verticalHeight: undefined,
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    onOutsideClick() {
    },
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,
    renderMonthText: null,
    renderMonthElement: null,
    // renderKeyboardShortcutsButton: null,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() {
    },
    onNextMonthClick() {
    },

    // internationalization
    monthFormat: 'MMMM YYYY',

};

class DayPickerRange extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.startDate) {
            this.setState({startDate: nextProps.startDate});
        }
        if (nextProps.endDate) {
            this.setState({endDate: nextProps.endDate});
        }
    }

    onDatesChange({startDate, endDate}) {
        this.setState({startDate, endDate});
        this.props.onDatesUpdate(startDate, endDate);
    }

    onFocusChange(focusedInput) {
        this.setState({
            // Force the focusedInput to always be truthy so that dates are always selectable
            focusedInput: !focusedInput ? START_DATE : focusedInput,
        });
    }

    render() {
        const {showInputs} = this.props;
        const {focusedInput, startDate, endDate} = this.state;

        const props = omit(this.props, [
            'autoFocus',
            'autoFocusEndDate',
            'initialStartDate',
            'initialEndDate',
            'showInputs',
            'onDatesUpdate',
        ]);

        const startDateString = startDate && startDate.format('YYYY-MM-DD');
        const endDateString = endDate && endDate.format('YYYY-MM-DD');

        return (
            <div style={{height: '100%'}}>
                {showInputs &&
                 <div style={{marginBottom: 16}}>
                     <input type="text" name="start date" value={startDateString} readOnly/>
                     <input type="text" name="end date" value={endDateString} readOnly/>
                 </div>
                }

                <DayPickerRangeController
                    {...props}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        );
    }
}

DayPickerRange.propTypes = propTypes;
DayPickerRange.defaultProps = defaultProps;


export default DayPickerRange;