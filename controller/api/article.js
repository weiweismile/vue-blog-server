const article = require('../../service/article');
exports.publishArticle = async (ctx) => {
    const { title, content, publishDate } = ctx.request.body;
    const user = ctx.session.user;
    const params = {
        title,
        content, 
        date: publishDate,
        author: user.username,
        authorID: user.id,
    };
    try {
        const rsp = await article.publishArticle(params);
        ctx.body = {
            code: 200,
            data: rsp || [],
            msg: 'success',
        };
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            data: [],
            msg: 'error',
        };
    }
}

exports.getArticle = async(ctx) => {
    const user = ctx.session.user;
    const params = {
        authorID: user.id,
    };
    try {
        const rsp = await article.getArticle(params);
        ctx.body = {
            code: 200,
            data: rsp || [],
            msg: 'success',
        };
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            data: [],
            msg: 'error',
        };
    }
}