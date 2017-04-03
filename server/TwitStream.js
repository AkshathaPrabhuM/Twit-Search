function TwitStream() {
  this.stream;
}

TwitStream.prototype.setStream = function (stream) {
  this.stream = stream;
}

TwitStream.prototype.getStream = function () {
  return this.stream;
}

module.exports = TwitStream;
