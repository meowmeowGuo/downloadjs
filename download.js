/** 通用下载工具 
 * @author miaomiao
 * @email miaomiao1459@163.com
 */
/**
 * @param {string} url : 下载链接
 * @param {object} [data] : 下载参数
 */
function getMethod(url, data){
  let queryString='';
  if(data){
    queryString = Objec.entries(data).reduce((res, cur)=>{
      const {key, value} = cur;
      return res += `${key}=${value}&`;
    },'?')
  }
  const aDom = document.createElement('a');
  aDom.style.display = 'none';
  if (downloadName) {
    aDom.download = downloadName;
  }
  aDom.href = url + queryString;
  document.body.appendChild(aDom);
  aDom.click();
  document.body.removeChild(aDom);
} 


/**
 * @param {string} url : 下载链接
 * @param {object} [data] : 下载参数
 */
function postMethod(url, data){
  /**
   * @param {string} name :创建form input的需要的name，最后formdata的key
   * @param {*} value :创建form input的需要的value，最后formdata的value
   *  res:<input name="myname" value="myvalue"/>
   * @returns 
   */
  const createInputItem = (name, value) => {
    let formInputItem = document.createElement('input');
    formInputItem.setAttribute('type', 'hidden');
    formInputItem.setAttribute('name', name);
    formInputItem.setAttribute('value', value);
    return formInputItem;
  };
  let downloadForm = document.createElement('form'); // 定义一个form表单
  downloadForm.setAttribute('style', 'display:none');// 将表单隐藏
  downloadForm.setAttribute('target', '_blank');
  downloadForm.setAttribute('method', 'post');
  downloadForm.setAttribute('action', url);
  Object.entries(data).forEach(([name, value]) => {
    if (Array.isArray(value)) {
      /*
      * value维数组时创建array.length个name都为给定name的input，value依次为数组的每个元素
      * res:<input name="myname" value="arrray[0]"/>
      *     <input name="myname" value="arrray[1]"/>
      *     ...
      * 最后通过form表单提交
      * */
      value.forEach(item => {
        let formInputItem = createInputItem(name, item);
        downloadForm.appendChild(formInputItem);// 一定要把参数添加到form里
      });
    } else {
      let formInputItem = createInputItem(name, value);
      downloadForm.appendChild(formInputItem);// 一定要把参数添加到form里
    }
  });
  document.body.appendChild(downloadForm);// 将表单放置在页面中
  downloadForm.submit();// 表单提交
  document.body.removeChild(downloadForm);// 移除表单
}

 /** 
   * @param {string} url: 下载的链接
   * @param {object} [options={}] : 下载配置
   * @param {string} [options.method='GET'] : 下载方法，get,post
   * @param {object} [options.data] : 下载时的请求参数
   * @memberof Download
   */
function Download(url, options ={}){
 
  if(!url){
    throw new Error('download need url');
  }
  const {method = 'GET', data = null} = options;
  if(!['POST','GET'].includes(method.toLocaleUpperCase)){
    /* 只支持get 和 post方式 */
    throw new Error('downloadjs only support get and post');
  }

  if(data && !data.constructor instanceof Object){
    throw new Error(`download data is expected to be object, but got ${data.constructor}`);
  }

  switch(method.toLocaleUpperCase){
    case 'GET':
      getMethod(url, data);
      break;
    case 'POST':
      postMethod(url, data);
      break;
    default:break;
  }
}

exports.Download = Download