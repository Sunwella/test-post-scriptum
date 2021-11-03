let chartDom = document.getElementById('chart');
let myChart = echarts.init(chartDom);

const animateDescription = () => {
    const duration = .5;
    gsap.fromTo('.description', {duration, opacity: 0, scale: .5}, {duration, opacity: 1, scale: 1});
};

const animateActiveDot = () => {
    const duration = .5;
    gsap.fromTo('.dot-active', {duration, opacity: 0, scale: .9}, {duration, opacity: 1, scale: 1});
};

const animateAdditionalInfo = (() => {
    let isAdditionalInfoOpened = false;
    const duration = .3;

    return {
        toggle() {
            if (isAdditionalInfoOpened) {
                this.close();
            } else {
                this.open();
            }
        },
        open() {
            isAdditionalInfoOpened = true;
            gsap.fromTo('.link', {duration, opacity: 1}, {duration, opacity: .4});
            gsap.fromTo('.from-bottom', {duration, y: 970}, {duration, y: 770});
            gsap.fromTo('.background-red', {duration, opacity: 0}, {duration, opacity: 1});
            gsap.fromTo('.additional', {duration, opacity: 0}, {duration, opacity: 1, display: 'block'});
        },
        close() {
            isAdditionalInfoOpened = false;
            gsap.fromTo('.link', {duration, opacity: .4}, {duration, opacity: 1});
            gsap.fromTo('.from-bottom', {duration, y: 770}, {duration, y: 970});
            gsap.fromTo('.background-red', {duration, opacity: 1}, {duration, opacity: 0});
            gsap.fromTo('.additional', {duration, opacity: 1}, {duration, opacity: 0, display: 'none'});
        },
    };
})();

const option = {
    title: {
        text: 'Динамика показателя ОФВ1 (%)',
        fontFamily: 'sans-serif',
        color: '#5E6C78',
        padding: [0, 43],
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        bottom: 0,
        left: 44,
        data: ['Спирива®', 'Тиотропиум®'],
        icon: 'rect',
        itemWidth: 8,
        itemHeight: 8,
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: 40,
        data: ['1-й визит', '2-й визит', '3-й визит', '4-й визит', '5-й визит', '6-й визит', '7-й визит', '8-й визит'],
        axisTick: {
            alignWithLabel: true,
        }
    },
    yAxis: {
        min: 42,
        max: 60,
        name: 'ОФВ1 (%)',
        nameTextStyle: {
            padding: [0, 0, -22, 80]
        },
        type: 'value',
        axisTick: {
            show: true,
        },
        axisLine: {
            show: true,
        },
        splitLine: {
            show: false,
        },
    },
    series: [
        {
            name: 'Спирива®',
            type: 'line',
            color: '#5E6C78',
            data: [46, 47, 48, 51, 50, 52, 54, 53],
            lineStyle: {
                width: 1,
            },
            symbol: 'rect',
            symbolSize: 5,
        },
        {
            name: 'Тиотропиум®',
            type: 'line',
            color: '#CE005B',
            data: [45, 47, 48.5, 47, 48, 50, 52, 53],
            lineStyle: {
                width: 1,
            },
            symbol: 'rect',
            symbolSize: 5,
        },
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    animateDescription();
    myChart.setOption(option);

    const $dots = document.querySelectorAll('.dot');
    let $currentActiveDot = document.querySelector('.dot-active');
    let $currentDescription = document.querySelector('.description-text');
    let $link = document.querySelector('.link');
    let $closeBtn = document.querySelector('.close');

    const setActiveDot = $dot => {
        $dots.forEach($dot => {
            $dot.classList.remove('dot-active');
        });
        $dot.classList.add('dot-active');
        $currentActiveDot = $dot;
        animateActiveDot();
    }

    const setDescription = $activeDot => {
        let indexActiveDot = Number($activeDot.dataset.index);
        let description = '';
        if (indexActiveDot === 1) {
            option.title.text = 'Динамика показателя ОФВ1 (%)';
            option.series[0].data = [46, 47, 48, 51, 50, 52, 54, 53];
            option.series[1].data = [45, 47, 48.5, 47, 48, 50, 52, 53];
            option.yAxis.name = 'ОФВ1 (%)';
            option.yAxis.min = 42;
            option.yAxis.max = 60;
            myChart.setOption(option);
            description = 'При оценке первичных и вторичных показателей эффективности, конечных значений и динамики показателей результаты в группах препарата Тиотропиум® были сопоставимы с препаратом Спирива®';
            animateDescription();
        } else if (indexActiveDot === 2) {
            option.title.text = 'Динамика показателя ОФВ1 (%)';
            option.series[0].data = [1.4, 1.45, 1.45, 1.6, 1.5, 1.6, 1.65, 1.62];
            option.series[1].data = [1.3, 1.39, 1.4, 1.39, 1.4, 1.5, 1.55, 1.58];
            option.yAxis.name = 'ОФВ1 (%)';
            option.yAxis.min = 1.2;
            option.yAxis.max = 1.9;
            myChart.setOption(option);
            description = 'При оценке первичных и вторичных показателей эффективности, конечных значений и динамики показателей результаты в группах препарата Тиотропиум® были сопоставимы с препаратом Спирива®';
            animateDescription();
        } else {
            option.title.text = 'Динамика спирометрических показателей';
            option.series[0].data = [2.5, 2.6, 2.6, 2.9, 2.8, 2.8, 2.9, 2.85];
            option.series[1].data = [2.4, 2.5, 2.5, 2.52, 2.6, 2.6, 2.75, 2.8];
            option.yAxis.name = 'ФЖЕЛ, л';
            option.yAxis.min = 2.2;
            option.yAxis.max = 3.4;
            myChart.setOption(option);
            description = 'В основной группе на фоне применения исследуемого препарата выявлена положительная динамика (прирост) ФЖЕЛ (л): среднее значение прироста составило 0,21 л, что говорит  о сопоставимости групп по вторичному показателю эффективности динамики спирометрических показателей (ФЖЕЛ)';
            animateDescription();
        }
        $currentDescription.innerHTML = description;
    }

    $dots.forEach($dot => {
        $dot.onclick = () => {
            setActiveDot($dot);
            setDescription($dot);
        }
    })

    $link.onclick = () => {
        animateAdditionalInfo.toggle();
    }

    $closeBtn.onclick = () => {
        animateAdditionalInfo.close();
    }
})