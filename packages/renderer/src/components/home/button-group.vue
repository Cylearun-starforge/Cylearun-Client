<template>
    <div class="container flex">
        <div class="col col-1 flex flex-col">
            <div class="campaign">
                <div class="zh">战役</div>
                <div class="en">CAMPAIGN</div>
            </div>
        </div>
        <div class="col col-2 flex flex-col">
            <div class="conquer">
                <div class="zh">征服之旅</div>
                <div class="en">CONQUER</div>
            </div>
            <div class="skirmish">
                <div class="zh">自定义游戏</div>
                <div class="en">SKIRMISH</div>
            </div>
        </div>
        <div class="col col-3 flex flex-col">
            <div class="col-3-fake"></div>
            <div class="load-mission">
                <div class="zh">载入存档</div>
                <div class="en">LOADMISSION</div>
            </div>
            <div class="activity">
                <div class="zh">巅峰活动</div>
                <div class="en">DIFFICULT ACTIVITY</div>
            </div>
        </div>


    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}

.col {
    height: 100%;
}

.col-1 {
    width: 36.5%;

}

.col-2 {
    width: 30.4%;

}

.col-3 {
    width: 33.3%;

}

.container .zh {
    font-family: '汉仪综艺体';
    line-height: 1;
}

.container .en {
    font-family: 'Marske';
    line-height: 1;
}

.container div {
    font-size: 40px;
}

.campaign {
    height: 56.8%;
    top: 11.37%;
    background-image: url('/home/buttons/campaign.png');
    background-size: 100% 100%;
}

.campaign .zh {
    font-size: 150%;
    position: absolute;
    right: 8%;
    top: 25%;
}

.campaign .en {
    position: absolute;
    right: 8%;
    top: 48%;
}


.conquer {
    height: 49.68%;

    background-image: url('/home/buttons/conquer.png');
    background-size: 100% 100%;

}

.conquer .zh {
    width: 50%;
    position: absolute;
    left: 8%;
    bottom: 20%;
}

.conquer .en {
    font-size: 65%;
    position: absolute;
    left: 9%;
    bottom: 8%;
}

.skirmish {
    height: 50.49%;

    background-image: url('/home/buttons/skirmish.png');
    background-size: 100% 100%;
}

.skirmish .zh {
    width: 65%;
    text-align: right;
    position: absolute;
    right: 8%;
    top: 25%;
}

.skirmish .en {
    font-size: 70%;
    position: absolute;
    right: 9%;
    top: 60%;
}

.col-3-fake {
    height: 21.1%;
    cursor: initial !important;
}

.load-mission {
    height: 20.1%;

    background-image: url('/home/buttons/load_mission.png');
    background-size: 100% 100%;
}

.load-mission .zh {
    font-size: 60%;
    position: absolute;
    left: 8%;
    top: 25%;
}

.load-mission .en {
    font-size: 69%;
    position: absolute;
    left: 8%;
    top: 56%;
}

.activity {
    height: 52.9%;

    background-image: url('/home/buttons/difficult_activity.png');
    background-size: 100% 100%;
}

.activity .zh {
    font-size: 73%;
    position: absolute;
    left: 9%;
    top: 27%;
}

.activity .en {
    font-size: 69%;
    position: absolute;
    left: 10%;
    top: 41%;
}

.container>.col>div {
    cursor: pointer;
}
</style>
