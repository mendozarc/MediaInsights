var ReportInfo = function () {

    var portlet = '#report_contents';
    var table = $('#sample_editable_1');
    var projectBriefId = 1;// $('#project_brief_id');
    var contentType = "application/json; charset=utf-8";

    var saveRecord = function (id, inputs, isNew) {
        Metronic.blockUI({ target: portlet, boxed: true });

        var data = {
            contentId: id,
            projectBrief: projectBriefId,
            title: inputs[0].value,
            sequence: inputs[1].value,
            layout: inputs[2].value,
            isNew: isNew
        };

        $.ajax({
            type: 'POST',
            url: 'ReportInfo.aspx/save',
            contentType: contentType,
            dataType: "json",
            data: JSON.stringify(data)
        })
            .fail(function () {
                CommSights.alert("<b>Failed!<b> Saving failed.", "danger");
            })
            .always(function () {
                Metronic.unblockUI(portlet);
            });
    };

    var deleteRecord = function (id) {
        Metronic.blockUI({ target: portlet, boxed: true });
        $.ajax({
            type: 'POST',
            url: 'ReportInfo.aspx/delete',
            contentType: contentType,
            dataType: "json",
            data: JSON.stringify({ id: id })
        })
            .fail(function () {
                CommSights.alert("<b>Failed!</b> Delete failed.", "danger");
            })
            .always(function () {
                Metronic.unblockUI(portlet);
            });
    }

    return {
        init: function () {
            jQuery(document).ready(function () {
                Metronic.init(); // init metronic core components
                Layout.init(); // init current layout
                //Demo.init(); // init demo features
                TableEditable.init();
            })
        },

        saveRow: function (id, inputs, isNew) {
            saveRecord(id, inputs, isNew);
        },

        deleteRow: function (id) {
            deleteRecord(id);
        }
    };
}();