import WidgetKit
import SwiftUI
import Intents


struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      
      let valuesData = ValuesData(name: "Hà Nội", condition_text:"Trời quang", condition_icon: "abc", temp: 20)
      return SimpleEntry(date: Date(), configuration: ConfigurationIntent(), data: valuesData)
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let valuesData = ValuesData(name: "Hà Nội", condition_text:"Trời quang", condition_icon: "abc", temp: 20)
        let entry = SimpleEntry(date: Date(), configuration: configuration,data: valuesData)
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
     
        var entries: [SimpleEntry] = []
      let userDfaults = UserDefaults.init(suiteName: "group.com.hiepnguyen.my_widget")
      let jsonText = userDfaults!.value(forKey: "widgetKey") as? String
      let jsonData = Data(jsonText?.utf8 ?? "".utf8)
      let valuesData = try! JSONDecoder().decode(ValuesData.self, from: jsonData)
      

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
          let entry = SimpleEntry(date: entryDate, configuration: configuration, data: valuesData)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct ValuesData: Codable {
  let name: String
  let condition_text: String
  let condition_icon: String
  let temp: Int
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
    let data: ValuesData
}

struct MyWidgetEntryView : View {
    var entry: Provider.Entry
  
  // Then render it later in  View
  private let placeHolderImage = UIImage(named: "almond-milk") ?? UIImage()
      @State private var remoteImage: UIImage?
  private func downloadWebImage() {
    NSLog("hiepnguyentest%@",entry.data.condition_text )
    guard let url = URL(string: entry.data.condition_text) else {
             return
         }
         URLSession.shared.dataTask(with: url) {[self] (data, response, error) in
             if let data = data,
                let image = UIImage(data: data) {
                 remoteImage = image
             } else {
                 debugPrint("error: \(String(describing: error))")
             }
         }.resume()
     }
  
  var redColor = Color(UIColor(displayP3Red: 1, green: 15/255, blue: 83/255, alpha: 1))
  
  @Environment(\.widgetFamily) var family

  var body: some View {
    HStack() {
      VStack(alignment: .leading) {
        Text(String(format: "Thời tiết tại %@", entry.data.name)).bold().font(.system(size: 18)).foregroundColor(redColor)
        Text(String(format: "%.d°", entry.data.temp))
          .bold()
          .font(.system(size: 40))
          .foregroundColor(Color.black)
          .shadow(color: .gray, radius: 15, x: 7, y: 7)
          .minimumScaleFactor(0.5)
        Text(String(format: "%@", entry.data.condition_text))
          .font(.system(size: 18))
          .foregroundColor(Color.gray)
       
         
       
      }
      
      if family == .systemMedium {
        VStack(alignment: .center) {
          Text("Last Updated")
            .bold()
            .font(.system(size: 12))
            .foregroundColor(redColor)
            .shadow(color: .gray, radius: 15, x: 7, y: 7)
            .minimumScaleFactor(0.5)
          Text("Today")
            .bold()
            .font(.system(size: 40))
            .foregroundColor(Color.black)
            .shadow(color: .gray, radius: 15, x: 7, y: 7)
            .minimumScaleFactor(0.5)
        }
      }
    }.padding(.all, 10)
  }
}

struct MyWidget: Widget {
    let kind: String = "MyWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
          MyWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Convertor Monex")
        .description("Check last conversion currencies!")
    }
}

struct MyWidget_Previews: PreviewProvider {
    static var previews: some View {
      let valuesData = ValuesData(name: "Hà Nội", condition_text:"Trời quang", condition_icon: "abc", temp: 20)
      MyWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), data: valuesData))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
