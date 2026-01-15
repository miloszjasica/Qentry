using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Converters
{
    public class CategoryToColorConverter : IMultiValueConverter
    {
        public object Convert(object[] values, Type targetType, object parameter, CultureInfo culture)
        {
            if (values.Length < 2)
                return Colors.Transparent;

            var itemCategory = values[0]?.ToString();
            var selectedCategory = values[1]?.ToString();

            return itemCategory == selectedCategory ? Color.FromArgb("#9893DA") : Colors.Transparent;
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
