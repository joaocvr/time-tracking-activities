class Registry {
  constructor(id, activityId, activityName, categoryId) {
    this.id = id;
    this.activityId = activityId;
    this.activityName = activityName;
    this.categoryId = categoryId;
  }

  startTime() {
    this.start = new Date().getTime();
  }

  finishTime() {
    this.finish = new Date().getTime();
  }

  totalMinutes() {
    return Math.round(this.finish - this.start / 60000);
  }

  get id() {
    return this.id;
  }
  set id(newId) {
    this.id = newId;
  }

  get activityId() {
    return this.activityId;
  }
  set activityId(newActivityId) {
    this.activityId = newActivityId;
  }

  get activityName() {
    return this.activityName;
  }
  set activityName(newActivityName) {
    this.activityName = newActivityName;
  }

  get categoryId() {
    return this.categoryId;
  }
  set categoryId(newCategoryId) {
    this.categoryId = newCategoryId;
  }

  get start() {
    return this.start;
  }
  set start(newStart) {
    this.start = newStart;
  }

  get finish() {
    return this.finish;
  }
  set finish(newFinish) {
    this.finish = newFinish;
  }
}

export default Registry;
