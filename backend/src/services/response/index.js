export const success = (res, status) => (entity) => {
    if (entity) {
        res.status(status || 200).json(entity)
    }
    return null
};

export const notFound = (res) => (params) => {
    let entity = {
        "error": "Not found",
        "params": params
    };
    res.status(404).json(entity)
};

export const errorHandler = (res, statusCode) => (error) => {
    res.status(statusCode || 500).json({
        "error": error
    })
};