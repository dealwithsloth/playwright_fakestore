const generateRandomEmailAddress = () => {
    return `test-${Date.now()}-${Math.floor(Math.random() * 10000)}@test.com`;
};

module.exports = { generateRandomEmailAddress };