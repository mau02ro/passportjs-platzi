function buildMessage(entity, action) {
  switch (action) {
    case 'create':
      return 'movie created';

    case 'list':
      return 'movies listed';
  }
}

module.exports = buildMessage;
