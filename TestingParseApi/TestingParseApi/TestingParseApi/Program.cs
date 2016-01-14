using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Parse;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;

namespace TestingParseApi
{
    class Program
    {
        static void Main(string[] args)
        {
            //ParseClient.Initialize("ZEhJJwrifNedqjaHRzOCC7q1SJIBwCPkDE1F1iNE", "f3o6qJ1mFn0IMOWPzLBvCUAOiSogtsmFyPTnU6U1");
            var pushMessage = "Testing Push";
            bool isPushMessageSend = false;

            string postString = "";
            string urlpath = "https://api.parse.com/1/push";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(urlpath);

            //send notifications for all devices (android)
            //for iOS just add "ios" to the $in array
            postString = "{\"data\": { \"alert\": \"Test Notification From C#\" },\"where\": { \"deviceType\":{ \"$in\":[\"android\"] }}}";

            httpWebRequest.ContentType = "application/json";
            httpWebRequest.ContentLength = postString.Length;
            httpWebRequest.Headers.Add("X-Parse-Application-Id", "ZEhJJwrifNedqjaHRzOCC7q1SJIBwCPkDE1F1iNE");
            httpWebRequest.Headers.Add("X-Parse-REST-API-KEY", "JLyYyGtGtVbiqyWxSWYV1pePw3FG5syrpWEezXz5");
            httpWebRequest.Method = "POST";
            StreamWriter requestWriter = new StreamWriter(httpWebRequest.GetRequestStream());
            requestWriter.Write(postString);
            requestWriter.Close();
            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var responseText = streamReader.ReadToEnd();
                Console.WriteLine(responseText);
                JObject jObjRes = JObject.Parse(responseText);
                if (Convert.ToString(jObjRes).IndexOf("true") != -1)
                {
                    isPushMessageSend = true;
                    Console.WriteLine(isPushMessageSend);
                }
            }

            //return isPushMessageSend;
            Console.ReadLine();
        }

    }
}
