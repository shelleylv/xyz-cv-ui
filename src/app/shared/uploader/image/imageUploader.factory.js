(function() {
    'use strict';

    angular
        .module('shared.uploader')
        .factory('ImageUploader', ImageUploader);

    function ImageUploader(API_URL, FileUploader) {

        return Uploader;

        function Uploader($scope) {

            var uploader = new FileUploader({
                url: API_URL + '/file/'
            });
            uploader.filters.push(getImageFilter());
            uploader.onAfterAddingFile = onAfterAddingFile;
            uploader.onBeforeUploadItem = onBeforeUploadItem;
            uploader.onWhenAddingFileFailed = onWhenAddingFileFailed;
            uploader.onAfterAddingAll = onAfterAddingAll;
            uploader.onProgressItem = onProgressItem;
            uploader.onProgressAll = onProgressAll;
            uploader.onSuccessItem = onSuccessItem;
            uploader.onErrorItem = onErrorItem;
            uploader.onCancelItem = onCancelItem;
            uploader.onCompleteItem = onCompleteItem;

            return uploader

            function getImageFilter() {
                return {
                    name: 'imageFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        console.log('|jpg|png|'.indexOf(type) !==1);
                        return '|jpg|png|'.indexOf(type) !==1;
                    }
                };
            }

            function removeLeadingItems(item) {
                var uploader = item.uploader;
                if (uploader.getIndexOfItem(item)) {
                    uploader.queue = [uploader.queue[uploader.queue.length -1]];
                }
            }

            function onAfterAddingFile(item) {
                removeLeadingItems(item);
                item.croppedImage = '';
                var reader = new FileReader();
                reader.onload = function(event) {
                    $scope.$apply(function() {
                        item.image = event.target.result;
                    });
                }
                reader.readAsDataURL(item._file);
            }

            function onBeforeUploadItem(item) {
                var blob = dataURIToBlob(item.croppedImage);
                item._file = blob;
                var extension = item._file.type.split('/')[1];
                var name = item.file.name.split('.');
                name[name.length -1] = extension;
                name = name.join('.');
                item.file.name = name;
            }

            function dataURIToBlob(dataURI) {
                var binary = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                var array = [];
                for(var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], {type: mimeString});
            }

            function onWhenAddingFileFailed(item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };

            function onAfterAddingAll(addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
            };

            function onProgressItem(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };

            function onProgressAll(progress) {
                console.info('onProgressAll', progress);
            };

            function onSuccessItem(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
            };

            function onErrorItem(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };

            function onCancelItem(fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };

            function onCompleteItem(fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
            };

            function onCompleteAll() {
                console.info('onCompleteAll');
            }
        }

    }

})();
