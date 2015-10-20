var CommSights = function() {
    var getIcon = function (type) {
        switch (type) {
            case 'success':
                return "check-circle";
            case 'warning':
                return 'warning';
            case 'danger':
                return 'times-circle';
            case "info":
                return 'info-circle';
        };
    }

    return {
        alert: function (message, type, icon) {
            icon = icon === undefined ? getIcon(type) : icon;

            return Metronic.alert({
                place: 'append',
                type: type,  // success, danger, info, warning
                message: message,
                close: true,
                focus: true,
                reset: true,
                icon: icon
            });
        }
    };
}();