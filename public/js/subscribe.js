$(document).ready(function()
{
    function display(msg)
    {
        $('#subscribe-form label').html(msg)
    }

    function success()
    {
        display('Success!<br /><br />Watch your phone ...');
    }

    $('#subscribe-form form').submit(function(e)
    {
        display('Subscribing ...');
        var phoneNumber = $('#phoneNumber').val();
        $('#subscribe-form input').remove();
        e.preventDefault();
        e.stopPropagation();
        jQuery.ajax({ url: '/subscribe'
                    , type: 'POST'
                    , data: {phoneNumber: phoneNumber}
                    , success: success
                     });
        return false;
    });
});
